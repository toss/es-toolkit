import { falsey } from '../_internal/falsey';
import { describe, expect, it } from 'vitest';
import { fromPairs } from './fromPairs';

describe('fromPairs', () => {
  it('should convert an array of key-value pairs into an object', () => {
    const result = fromPairs([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const expected = { a: 1, b: 2, c: 3 };
    expect(result).toEqual(expected);
  });

  it('should handle different types of keys', () => {
    const result = fromPairs([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]);
    const expected = { 1: 'one', 2: 'two', 3: 'three' };
    expect(result).toEqual(expected);
  });

  it('should handle Symbol type keys', () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');
    const result = fromPairs([
      [sym1, 'value1'],
      [sym2, 'value2'],
    ]);
    const expected = { [sym1]: 'value1', [sym2]: 'value2' };
    expect(result).toEqual(expected);
  });

  it('should handle Map objects', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const result = fromPairs(map);
    const expected = { a: 1, b: 2, c: 3 };
    expect(result).toEqual(expected);
  });

  it('should accept a two dimensional array', () => {
    const array = [
      ['a', 1],
      ['b', 2],
    ];
    const object = { a: 1, b: 2 };
    const actual = fromPairs(array);

    expect(actual).toEqual(object);
  });

  it('should accept a falsey `array`', () => {
    const expected = falsey.map(() => ({}));

    const actual = falsey.map((array, index) => {
      try {
        // eslint-disable-next-line
        // @ts-ignore
        return index ? fromPairs(array) : fromPairs();
        // eslint-disable-next-line
      } catch (e) {}
    });

    expect(actual).toEqual(expected);
  });

  it('should not support deep paths', () => {
    const actual = fromPairs([['a.b', 1]]);
    expect(actual).toEqual({ 'a.b': 1 });
  });

  // it('should support consuming the return value of `_.toPairs`', () => {
  //   const object = { 'a.b': 1 };
  //   expect(fromPairs(toPairs(object))).toEqual(object);
  // });
});
