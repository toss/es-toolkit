import { describe, expect, expectTypeOf, it } from 'vitest';
import type { isEqualWith as isEqualWithLodash } from 'lodash';
import { isEqualWith } from './isEqualWith';
import { isString } from './isString';
import { without } from '../../array/without';
import { noop } from '../../function/noop';
import { falsey } from '../_internal/falsey';
import { slice } from '../_internal/slice';
import { stubC } from '../_internal/stubC';
import { stubFalse } from '../util/stubFalse';

describe('isEqualWith', () => {
  it('should provide correct `customizer` arguments', () => {
    const argsList: any = [];
    const object1: any = { a: [1, 2], b: null };
    const object2: any = { a: [1, 2], b: null };

    object1.b = object2;
    object2.b = object1;

    const expected = [
      [object1, object2, undefined, undefined, undefined],
      [object1.a, object2.a, 'a', object1, object2],
      [object1.a[0], object2.a[0], 0, object1.a, object2.a],
      [object1.a[1], object2.a[1], 1, object1.a, object2.a],
      [object1.b, object2.b, 'b', object1.b, object2.b],
    ];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    isEqualWith(object1, object2, function () {
      const length = arguments.length;
      // eslint-disable-next-line prefer-rest-params
      const args = slice.call(arguments, 0, length - (length > 2 ? 1 : 0));

      argsList.push(args);
    });

    expect(argsList).toEqual(expected);
  });

  it('should handle comparisons when `customizer` returns `undefined`', () => {
    expect(isEqualWith('a', 'a')).toBe(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(isEqualWith('a', 'a', noop)).toBe(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(isEqualWith(['a'], ['a'], noop)).toBe(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(isEqualWith({ 0: 'a' }, { 0: 'a' }, noop)).toBe(true);
  });

  it('should not handle comparisons when `customizer` returns `true`', () => {
    const customizer = function (value: any) {
      return isString(value) || undefined;
    };

    expect(isEqualWith('a', 'b', customizer)).toBe(true);
    expect(isEqualWith(['a'], ['b'], customizer)).toBe(true);
    expect(isEqualWith({ 0: 'a' }, { 0: 'b' }, customizer)).toBe(true);
  });

  it('should not handle comparisons when `customizer` returns `false`', () => {
    const customizer = function (value: any) {
      return isString(value) ? false : undefined;
    };

    expect(isEqualWith('a', 'a', customizer)).toBe(false);
    expect(isEqualWith(['a'], ['a'], customizer)).toBe(false);
    expect(isEqualWith({ 0: 'a' }, { 0: 'a' }, customizer)).toBe(false);
  });

  it('should return a boolean value even when `customizer` does not', () => {
    // eslint-disable-next-line
    // @ts-ignore
    let actual: any = isEqualWith('a', 'b', stubC);
    expect(actual).toBe(true);

    const values = without(falsey, undefined);
    const expected = values.map(stubFalse);

    actual = [];
    values.forEach(value => {
      // eslint-disable-next-line
      // @ts-ignore
      actual.push(isEqualWith('a', 'a', () => value));
    });

    expect(actual).toEqual(expected);
  });

  it('should ensure `customizer` is a function', () => {
    const array = [1, 2, 3];
    // eslint-disable-next-line
    // @ts-ignore
    const eq = (...args: any[]) => isEqualWith(array, ...args);
    // eslint-disable-next-line
    // @ts-ignore
    const actual = [array, [1, 0, 3]].map(eq);

    expect(actual).toEqual([true, false]);
  });

  it('should call `customizer` for values maps and sets', () => {
    const value = { a: { b: 2 } };

    const map1 = new Map();
    map1.set('a', value);

    const map2 = new Map();
    map2.set('a', value);

    const set1 = new Set();
    set1.add(value);

    const set2 = new Set();
    set2.add(value);

    [
      [map1, map2],
      [set1, set2],
    ].forEach((pair, index) => {
      if (pair[0]) {
        const argsList: any = [];
        const array: any[] = Array.from(pair[0]);

        const expected: any = [
          [pair[0], pair[1], undefined, undefined, undefined],
          [array[0], array[0], 0, array, array],
          [array[0][0], array[0][0], 0, array[0], array[0]],
          [array[0][1], array[0][1], 1, array[0], array[0]],
        ];

        if (index) {
          expected.length = 2;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        isEqualWith(pair[0], pair[1], function () {
          const length = arguments.length;
          // eslint-disable-next-line prefer-rest-params
          const args = slice.call(arguments, 0, length - (length > 2 ? 1 : 0));

          argsList.push(args);
        });

        expect(argsList).toEqual(expected);
      }
    });
  });

  it('should match the type of lodash', () => {
    expectTypeOf(isEqualWith).toEqualTypeOf<typeof isEqualWithLodash>();
  });
});
