import { describe, expect, it } from 'vitest';
import { pullAllWith } from './pullAllWith';
import { isEqual } from '../../predicate';

describe('pullAllWith', () => {
  const methodName = 'pullAllWith';

  // -------------------- lodash test case 1 -------------------- //
  it(`\`_.${methodName}\` should work with a \`comparator\``, () => {
    const objects = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ];
    const expected = [objects[0], objects[2]];
    const actual = pullAllWith(objects, [{ x: 2, y: 2 }], isEqual);

    expect(actual).toEqual(expected);
  });

  // -------------------- lodash test case 2 -------------------- //
  it(`\`_.${methodName}\` should modify and return the array`, () => {
    const array = [1, 2, 3];
    const result = pullAllWith(array, [1, 3]);

    expect(result).toBe(array);
    expect(array).toEqual([2]);
  });

  it(`\`_.${methodName}\` should preserve holes in arrays`, () => {
    const array = [1, 2, 3, 4];
    delete array[1];
    delete array[3];

    pullAllWith(array, [1]);
    expect(0 in array).toBe(false);
    expect(1 in array).toBe(true);
    expect(2 in array).toBe(false);
  });

  it(`\`_.${methodName}\` should treat holes as undefined`, () => {
    const array = [1, 2, 3];
    delete array[1];

    pullAllWith(array, [undefined]);
    expect(array).toEqual([1, 3]);
  });

  it('should preserve holes when the comparator does not match undefined', () => {
    const array = [1, 2, 3];
    delete array[1];

    pullAllWith(array, [undefined], () => false);

    expect(array).toHaveLength(3);
    expect(1 in array).toBe(false);
    expect(array[0]).toBe(1);
    expect(array[2]).toBe(3);
  });

  it('should remove holes when the comparator matches them', () => {
    const array: Array<number | null> = [1, 2, 3];
    delete array[1];

    pullAllWith(array, [null], (a, b) => a == null && b == null);

    expect(array).toStrictEqual([1, 3]);
  });

  it.each([undefined, Object.is])('should treat holes in values as undefined with comparator %s', comparator => {
    const array = [undefined, 1, undefined];
    const values = new Array<undefined>(1);

    pullAllWith(array, values, comparator);

    expect(array).toStrictEqual([1]);
  });

  it.each([{ array: [2] }, { array: [3, 2] }])('should ignore appended removal values for $array', ({ array }) => {
    const expected = array.slice();
    const values = [1];

    pullAllWith(array, values, (a, b) => {
      if (values.length === 1) {
        values.push(2);
      }
      return a === b;
    });

    expect(array).toStrictEqual(expected);
  });

  it('should visit the original removal range when the comparator shortens values', () => {
    const array = [undefined];
    const values: Array<number | undefined> = [1, 2];

    pullAllWith(array, values, (a, b) => {
      values.length = 1;
      return a === b;
    });

    expect(array).toStrictEqual([]);
  });

  it.each([{ values: [undefined] }, { values: new Array<undefined>(1) }])(
    'should remove input holes with default removal values $values',
    ({ values }) => {
      const array = new Array<number | undefined>(3);
      array[1] = 1;

      pullAllWith(array, values);

      expect(array).toStrictEqual([1]);
    }
  );

  it(`\`_.${methodName}\` should match NaN`, () => {
    const array = [1, NaN, 3, NaN];

    pullAllWith(array, [NaN]);
    expect(array).toEqual([1, 3]);
  });

  // -------------------- custom test case -------------------- //
  it('should behave differently for shallow vs deep comparator', () => {
    const array = [{ a: { b: 1 } }, { a: { b: 2 } }];
    const values = [{ a: { b: 1 } }];

    const shallow = (a: any, b: any) => a.a === b.a;
    const deep = isEqual;

    const arr1 = [...array];
    const arr2 = [...array];

    pullAllWith(arr1, values, shallow);
    pullAllWith(arr2, values, deep);

    expect(arr1).toEqual(array);
    expect(arr2).toEqual([{ a: { b: 2 } }]);
  });

  it('should treat -0 and 0 as equal with default comparator', () => {
    const array = [-0, 1, 0];
    pullAllWith(array, [0], Object.is);
    expect(array).toEqual([-0, 1]);
  });

  it('should handle weird JS values properly', () => {
    const array = [NaN, undefined, null, false, 0];
    const values = [NaN, undefined, null];

    pullAllWith(array, values);
    expect(array).toEqual([false, 0]);
  });

  it('should handle large sparse arrays correctly', () => {
    const array = new Array(1e5);
    array[123] = 1;
    array[456] = 2;
    array[789] = 3;

    pullAllWith(array, [2]);

    expect(123 in array).toBe(true);
    expect(456 in array).toBe(false);
    expect(789 in array).toBe(false);
  });

  it('should handle null and undefined values', () => {
    // @ts-expect-error - null is not an array
    expect(pullAllWith(null, [1, 2, 3])).toEqual(null);
    // @ts-expect-error - undefined is not an array
    expect(pullAllWith(undefined, [1, 2, 3])).toEqual(undefined);
  });

  it('should work with array-like objects as values', () => {
    const array = [1, 2, 3, 4];
    const arrayLikeValues = { 0: 2, 1: 4, length: 2 };

    pullAllWith(array, arrayLikeValues);

    expect(array).toEqual([1, 3]);
  });

  it('should work with the same value for `array` and `values`', () => {
    const array = [{ a: 1 }, { b: 2 }];
    const actual = pullAllWith(array, array);

    expect(actual).toEqual([]);
  });
});
