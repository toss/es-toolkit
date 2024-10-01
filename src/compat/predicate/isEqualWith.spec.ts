import { describe, expect, it } from 'vitest';
import { isEqualWith } from './isEqualWith';
import { isString } from './isString';
import { without } from '../../array/without';
import { noop } from '../../function/noop';
import { partial } from '../../function/partial';
import { falsey } from '../_internal/falsey';
import { slice } from '../_internal/slice';
import { stubC } from '../_internal/stubC';
import { stubFalse } from '../_internal/stubFalse';

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

    isEqualWith(object1, object2, function () {
      const length = arguments.length;
      const args = slice.call(arguments, 0, length - (length > 2 ? 1 : 0));

      console.log(Array.from(arguments));

      argsList.push(args);
    });

    console.log(argsList);

    expect(argsList).toEqual(expected);
  });

  it('should handle comparisons when `customizer` returns `undefined`', () => {
    expect(isEqualWith('a', 'a', noop)).toBe(true);
    expect(isEqualWith(['a'], ['a'], noop)).toBe(true);
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

    var map1 = new Map();
    map1.set('a', value);

    var map2 = new Map();
    map2.set('a', value);

    var set1 = new Set();
    set1.add(value);

    var set2 = new Set();
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
        isEqualWith(pair[0], pair[1], function () {
          const length = arguments.length;
          const args = slice.call(arguments, 0, length - (length > 2 ? 1 : 0));

          argsList.push(args);
        });

        expect(argsList).toEqual(expected);
      }
    });
  });
});
