import { describe, expect, it } from 'vitest';
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
});
