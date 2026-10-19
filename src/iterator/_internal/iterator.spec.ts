import { describe, expect, it, vi } from 'vitest';
import { iterator } from './iterator.ts';

function fromArray<T>(values: readonly T[]): IteratorObject<T, undefined> {
  let index = 0;
  return iterator(function () {
    if (index >= values.length) {
      return { value: undefined, done: true };
    }
    return { value: values[index++], done: false };
  });
}

describe('iterator', () => {
  it('produces an iterable that yields the values from next', () => {
    expect([...fromArray([1, 2, 3])]).toEqual([1, 2, 3]);
  });

  it('returns itself from Symbol.iterator', () => {
    const it = fromArray([1, 2, 3]);
    expect(it[Symbol.iterator]()).toBe(it);
  });

  it('inherits native iterator helpers', () => {
    const result = fromArray([1, 2, 3, 4, 5])
      .map(x => x * 2)
      .filter(x => x > 4)
      .take(2)
      .toArray();
    expect(result).toEqual([6, 8]);
  });

  it('is single-shot', () => {
    const it = fromArray([1, 2, 3]);
    expect([...it]).toEqual([1, 2, 3]);
    expect([...it]).toEqual([]);
  });

  it('calls onClose once when the consumer terminates early', () => {
    const onClose = vi.fn();
    let n = 0;
    const it = iterator(() => ({ value: n++, done: false }), onClose);

    it.return?.();
    it.return?.();

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call next again after return', () => {
    const next = vi.fn(() => ({ value: 1, done: false as const }));
    const it = iterator(next);

    it.next();
    it.return?.();

    expect(it.next()).toEqual({ value: undefined, done: true });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when next reports done', () => {
    const onClose = vi.fn();
    const it = iterator(() => ({ value: undefined, done: true }), onClose);

    it.next();

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose and rethrows when next throws', () => {
    const onClose = vi.fn();
    const it = iterator(() => {
      throw new Error('boom');
    }, onClose);

    expect(() => it.next()).toThrow('boom');
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(it.next()).toEqual({ value: undefined, done: true });
  });

  it('closes when a native helper stops early', () => {
    const onClose = vi.fn();
    let n = 0;
    const it = iterator(() => ({ value: n++, done: false }), onClose);

    it.take(2).toArray();

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when a for...of loop breaks', () => {
    const onClose = vi.fn();
    let n = 0;
    const it = iterator(() => ({ value: n++, done: false }), onClose);

    for (const value of it) {
      if (value >= 1) {
        break;
      }
    }

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
