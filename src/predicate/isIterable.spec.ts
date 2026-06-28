import { describe, expect, it } from 'vitest';
import { isIterable } from './isIterable.ts';

describe('isIterable', () => {
  it('returns true for arrays', () => {
    expect(isIterable([])).toBe(true);
    expect(isIterable([1, 2, 3])).toBe(true);
  });

  it('returns true for strings', () => {
    expect(isIterable('')).toBe(true);
    expect(isIterable('abc')).toBe(true);
  });

  it('returns true for Set and Map', () => {
    expect(isIterable(new Set([1, 2]))).toBe(true);
    expect(isIterable(new Map())).toBe(true);
  });

  it('returns true for typed arrays', () => {
    expect(isIterable(new Uint8Array([1, 2]))).toBe(true);
  });

  it('returns true for generators', () => {
    function* gen() {
      yield 1;
    }
    expect(isIterable(gen())).toBe(true);
  });

  it('returns true for a custom iterable', () => {
    const custom = {
      *[Symbol.iterator]() {
        yield 1;
      },
    };
    expect(isIterable(custom)).toBe(true);
  });

  it('returns false for plain objects', () => {
    expect(isIterable({})).toBe(false);
    expect(isIterable({ a: 1 })).toBe(false);
  });

  it('returns false for non-iterable primitives', () => {
    expect(isIterable(123)).toBe(false);
    expect(isIterable(true)).toBe(false);
    expect(isIterable(Symbol('x'))).toBe(false);
  });

  it('returns false for null and undefined', () => {
    expect(isIterable(null)).toBe(false);
    expect(isIterable(undefined)).toBe(false);
  });

  it('narrows the type to Iterable<unknown>', () => {
    const value: unknown = [1, 2, 3];
    if (!isIterable(value)) {
      throw new Error('expected an iterable');
    }
    expect([...value]).toEqual([1, 2, 3]);
  });
});
