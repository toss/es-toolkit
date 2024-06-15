import { describe, expect, it } from 'vitest';
import { isEmpty } from './isEmpty';

const falsyList = [null, undefined, false, 0, NaN, ''];

class Foo {
  length: number;
  constructor(length = 0) {
    this.length = length;
  }
}

describe('isEmpty', () => {
  it('should return `true` for empty values', () => {
    const expected = Array(falsyList.length).fill(true);
    const actual = falsyList.map(falsy => isEmpty(falsy));

    expect(actual).toEqual(expected);

    expect(isEmpty(NaN)).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
  });

  it('should return `false` for non-empty values', () => {
    expect(isEmpty([0])).toBe(false);
    expect(isEmpty('a')).toBe(false);
    expect(isEmpty({ a: 0 })).toBe(false);
    expect(isEmpty(1)).toBe(false);
  });

  it('should work with an object that has a `length` property', () => {
    expect(isEmpty({ length: 0 })).toBe(false);
  });

  it('should work with maps', () => {
    if (Map) {
      const map = new Map();
      expect(isEmpty(map)).toBe(true);
      map.set('a', 1);
      expect(isEmpty(map)).toBe(false);
      map.clear();
    }
  });

  it('should work with sets', () => {
    if (Set) {
      const set = new Set();
      expect(isEmpty(set)).toBe(true);
      set.add(1);
      expect(isEmpty(set)).toBe(false);
      set.clear();
    }
  });

  it('should not treat objects with negative lengths as array-like', () => {
    expect(isEmpty(new Foo(-1))).toBe(true);
  });

  it('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', () => {
    expect(isEmpty(new Foo(Number.MAX_SAFE_INTEGER + 1))).toBe(true);
  });

  it('should not treat objects with non-number lengths as array-like', () => {
    expect(isEmpty({ length: '0' })).toBe(false);
  });
});
