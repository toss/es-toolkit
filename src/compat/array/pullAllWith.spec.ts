import { describe, expect, it, expectTypeOf } from 'vitest';
import type { pullAllWith as pullAllWithLodash } from 'lodash';
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

  it('should match the type of lodash', () => {
    expectTypeOf(pullAllWith).toEqualTypeOf<typeof pullAllWithLodash>();
  });
});
