import { describe, expect, it, expectTypeOf } from 'vitest';
import type { uniqWith as uniqWithLodash } from 'lodash';
import * as lodashStable from 'es-toolkit/compat';
import { uniqWith } from './uniqWith';
import { isEven } from '../_internal/isEven';
import { LARGE_ARRAY_SIZE } from '../_internal/LARGE_ARRAY_SIZE';

describe('uniqWith', () => {
  const objects = [{ a: 2 }, { a: 3 }, { a: 1 }, { a: 2 }, { a: 3 }, { a: 1 }];

  // test case #1
  it('should work with a `comparator`', () => {
    const objects = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
    ];
    const actual = uniqWith(objects, lodashStable.isEqual);

    expect(actual).toEqual([objects[0], objects[1]]);
  });

  it('should preserve the sign of `0`', () => {
    const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, index => (isEven(index) ? -0 : 0));

    const arrays = [[-0, 0], largeArray];
    const expected = lodashStable.map(arrays, lodashStable.constant(['-0']));

    const actual = lodashStable.map(arrays, array =>
      lodashStable.map(uniqWith(array, lodashStable.eq), lodashStable.toString)
    );

    expect(actual).toEqual(expected);
  });

  // test case #2
  it(`should return unique values of an unsorted array`, () => {
    const array = [2, 1, 2];
    expect(uniqWith(array)).toEqual([2, 1]);
  });

  it(`should return unique values of a sorted array`, () => {
    const array = [1, 2, 2];
    expect(uniqWith(array)).toEqual([1, 2]);
  });

  it(`should treat object instances as unique`, () => {
    expect(uniqWith(objects)).toEqual(objects);
  });

  it(`should treat \`-0\` as \`0\``, () => {
    const actual = lodashStable.map(uniqWith([-0, 0]), lodashStable.toString);
    expect(actual).toEqual(['0']);
  });

  it(`should match \`NaN\``, () => {
    expect(uniqWith([NaN, NaN])).toEqual([NaN]);
  });

  it(`should work with large arrays`, () => {
    const largeArray: any[] = [];
    const expected = [0, {}, 'a'];
    const count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

    lodashStable.each(expected, value => {
      lodashStable.times(count, () => {
        largeArray.push(value);
      });
    });

    expect(uniqWith(largeArray)).toEqual(expected);
  });

  it(`should work with large arrays of \`-0\` as \`0\``, () => {
    const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, index => (isEven(index) ? -0 : 0));

    const actual = lodashStable.map(uniqWith(largeArray), lodashStable.toString);
    expect(actual).toEqual(['0']);
  });

  it(`should work with large arrays of boolean, \`NaN\`, and nullish values`, () => {
    const largeArray: any[] = [];
    const expected = [null, undefined, false, true, NaN];
    const count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

    lodashStable.each(expected, value => {
      lodashStable.times(count, () => {
        largeArray.push(value);
      });
    });

    expect(uniqWith(largeArray)).toEqual(expected);
  });

  it(`should work with large arrays of symbols`, () => {
    if (Symbol) {
      const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, Symbol);
      expect(uniqWith(largeArray)).toEqual(largeArray);
    }
  });

  it(`should work with large arrays of well-known symbols`, () => {
    // See http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols.
    if (Symbol) {
      let expected = [
        Symbol.hasInstance,
        Symbol.isConcatSpreadable,
        Symbol.iterator,
        Symbol.match,
        Symbol.replace,
        Symbol.search,
        Symbol.species,
        Symbol.split,
        Symbol.toPrimitive,
        Symbol.toStringTag,
        Symbol.unscopables,
      ];

      const largeArray: any[] = [];
      const count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

      expected = lodashStable.map(expected, symbol => symbol || {});

      lodashStable.each(expected, value => {
        lodashStable.times(count, () => {
          largeArray.push(value);
        });
      });

      expect(uniqWith(largeArray)).toEqual(expected);
    }
  });

  it(`should distinguish between numbers and numeric strings`, () => {
    const largeArray: any[] = [];
    const expected = ['2', 2, Object('2'), Object(2)];
    const count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

    lodashStable.each(expected, value => {
      lodashStable.times(count, () => {
        largeArray.push(value);
      });
    });

    expect(uniqWith(largeArray)).toEqual(expected);
  });

  // additional test
  it('should unique Symbol instances', () => {
    const a = Symbol('a');
    const b = Symbol('a');

    const result = uniqWith([a, a, b], Object.is);

    expect(result).toEqual([a, b]);
  });

  it('should handle array-like objects', () => {
    const arrayLike = {
      0: { id: 1 },
      1: { id: 1 },
      2: { id: 2 },
      length: 3,
    };

    const result = uniqWith(Array.from(arrayLike), (a, b) => a.id === b.id);

    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should return an empty array when input is not array-like', () => {
    expect(uniqWith(null, (a, b) => a === b)).toEqual([]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(uniqWith).toEqualTypeOf<typeof uniqWithLodash>();
  });
});
