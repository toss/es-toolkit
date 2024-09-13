import { describe, expect, it } from 'vitest';
import { sortBy } from './sortBy.ts';
import { zipObject } from '../../array/zipObject.ts';
import { partialRight } from '../../function/partialRight.ts';

describe('sortBy', () => {
  class Pair {
    constructor(
      public a: number | undefined,
      public b: number,
      public c: number
    ) {
      this.a = a;
      this.b = b;
      this.c = c;
    }
  }
  const objects = [
    { a: 'x', b: 3 },
    { a: 'y', b: 4 },
    { a: 'x', b: 1 },
    { a: 'y', b: 2 },
  ];

  const stableArray = [
    new Pair(1, 1, 1),
    new Pair(1, 2, 1),
    new Pair(1, 1, 1),
    new Pair(1, 2, 1),
    new Pair(1, 3, 1),
    new Pair(1, 4, 1),
    new Pair(1, 5, 1),
    new Pair(1, 6, 1),
    new Pair(2, 1, 2),
    new Pair(2, 2, 2),
    new Pair(2, 3, 2),
    new Pair(2, 4, 2),
    new Pair(2, 5, 2),
    new Pair(2, 6, 2),
    new Pair(undefined, 1, 1),
    new Pair(undefined, 2, 1),
    new Pair(undefined, 3, 1),
    new Pair(undefined, 4, 1),
    new Pair(undefined, 5, 1),
    new Pair(undefined, 6, 1),
  ];

  const stableObject = zipObject('abcdefghijklmnopqrst'.split(''), stableArray);

  it(`should sort multiple properties in ascending order`, () => {
    const actual = sortBy(objects, ['a', 'b']);
    expect(actual).toEqual([objects[2], objects[0], objects[3], objects[1]]);
  });

  it(`should support iteratees`, () => {
    const actual = sortBy(objects, [
      'a',
      function (object) {
        return object.b;
      },
    ]);
    expect(actual).toEqual([objects[2], objects[0], objects[3], objects[1]]);
  });

  it(`should perform a stable sort (test in IE > 8 and V8)`, () => {
    expect(sortBy(stableArray, ['a', 'c'])).toEqual(stableArray);
    expect(sortBy(stableObject, ['a', 'c'])).toEqual(stableArray);
  });

  it(`should not error on nullish elements`, () => {
    let actual;
    try {
      actual = sortBy([...objects, null, undefined], ['a', 'b']);
    } catch {
      // do nothing
    }

    expect(actual).toEqual([objects[2], objects[0], objects[3], objects[1], null, undefined]);
  });

  it(`should work as an iteratee for methods like \`_.reduce\``, () => {
    const objects = [
      { a: 'x', 0: 3 },
      { a: 'y', 0: 4 },
      { a: 'x', 0: 1 },
      { a: 'y', 0: 2 },
    ];

    expect(['a'].reduce(sortBy, objects)).toEqual([objects[0], objects[2], objects[1], objects[3]]);
    expect([0].reduce(sortBy, objects)).toEqual([objects[2], objects[3], objects[0], objects[1]]);
    expect([[0]].reduce(sortBy, objects)).toEqual([objects[2], objects[3], objects[0], objects[1]]);

    const wrapped = partialRight(sortBy, 'bogus');

    expect(['a'].reduce(wrapped, objects)).toEqual([objects[0], objects[2], objects[1], objects[3]]);
    expect([0].reduce(wrapped, objects)).toEqual([objects[2], objects[3], objects[0], objects[1]]);
    expect([[0]].reduce(wrapped, objects)).toEqual([objects[2], objects[3], objects[0], objects[1]]);
  });

  it('should sort in ascending order by `iteratee`', () => {
    expect(sortBy(objects, object => object.b).map(object => object.b)).toEqual([1, 2, 3, 4]);
  });

  it('should use `_.identity` when `iteratee` is nullish', () => {
    const array = [3, 2, 1];
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = values.map(() => [1, 2, 3]);

    const actual = values.map((value, index) => (index ? sortBy(array, value) : sortBy(array)));
    expect(actual).toEqual(expected);
  });

  it('should work with `_.property` shorthands', () => {
    expect(sortBy({ ...objects, undefined }, 'b').map(object => object?.b)).toEqual([1, 2, 3, 4, undefined]);
  });

  it('should work with an object for `collection`', () => {
    expect(sortBy({ a: 1, b: 2, c: 3 }, Math.sin)).toEqual([3, 1, 2]);
  });

  it('should move `NaN`, nullish, and symbol values to the end', () => {
    const symbol1 = Symbol ? Symbol('a') : null;
    const symbol2 = Symbol ? Symbol('b') : null;
    const array = [NaN, undefined, null, 4, symbol1, null, 1, symbol2, undefined, 3, NaN, 2];
    const expected = [1, 2, 3, 4, symbol1, symbol2, null, null, undefined, undefined, NaN, NaN];

    expect(sortBy(array)).toEqual(expected);

    const array2 = [NaN, undefined, symbol1, null, 'd', null, 'a', symbol2, undefined, 'c', NaN, 'b'];
    const expected2 = ['a', 'b', 'c', 'd', symbol1, symbol2, null, null, undefined, undefined, NaN, NaN];

    expect(sortBy(array2)).toEqual(expected2);
  });

  it('should treat number values for `collection` as empty', () => {
    expect(sortBy(1)).toEqual([]);
  });

  it('should coerce arrays returned from `iteratee`', () => {
    const actual = sortBy(objects, object => {
      const result = [object.a, object.b];
      result.toString = function () {
        return String(this[0]);
      };
      return result;
    });

    expect(actual).toEqual([objects[0], objects[2], objects[1], objects[3]]);
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    expect(
      [
        [2, 1, 3],
        [3, 2, 1],
      ].map(sortBy)
    ).toEqual([
      [1, 2, 3],
      [1, 2, 3],
    ]);
  });
});
