import { describe, expect, expectTypeOf, it } from 'vitest';
import * as lodashStable from 'es-toolkit/compat';
import type { isMatchWith as isMatchWithLodash } from 'lodash';
import { isMatchWith } from './isMatchWith.ts';
import { last } from '../../array/last.ts';
import { partial } from '../../function/partial.ts';
import { falsey } from '../_internal/falsey.ts';
import { stubA } from '../_internal/stubA.ts';
import { stubFalse } from '../util/stubFalse.ts';
import { stubTrue } from '../util/stubTrue.ts';

describe('isMatchWith', () => {
  it('should provide correct `customizer` arguments', () => {
    const argsList: unknown[] = [];
    const object1: any = { a: [1, 2], b: null };
    const object2: any = { a: [1, 2], b: null };

    object1.b = object2;
    object2.b = object1;

    const expected = [
      [object1.a, object2.a, 'a', object1, object2],
      [object1.a[0], object2.a[0], 0, object1.a, object2.a],
      [object1.a[1], object2.a[1], 1, object1.a, object2.a],
      [object1.b, object2.b, 'b', object1, object2],
      [object1.b.a, object2.b.a, 'a', object1.b, object2.b],
      [object1.b.a[0], object2.b.a[0], 0, object1.b.a, object2.b.a],
      [object1.b.a[1], object2.b.a[1], 1, object1.b.a, object2.b.a],
      [object1.b.b, object2.b.b, 'b', object1.b, object2.b],
    ];

    isMatchWith(object1, object2, function () {
      // eslint-disable-next-line prefer-rest-params
      argsList.push(Array.prototype.slice.call(arguments, 0, -1));
    });

    expect(argsList).toEqual(expected);
  });

  it('should handle comparisons when `customizer` returns `undefined`', () => {
    expect(isMatchWith({ a: 1 }, { a: 1 })).toBe(true);
  });

  it('should not handle comparisons when `customizer` returns `true`', () => {
    const customizer = function (value: unknown) {
      return typeof value === 'string' || undefined;
    };

    expect(isMatchWith(['a'], ['b'], customizer)).toBe(true);
    expect(isMatchWith({ 0: 'a' }, { 0: 'b' }, customizer)).toBe(true);
  });

  it('should not handle comparisons when `customizer` returns `false`', () => {
    const customizer = function (value: unknown) {
      return typeof value === 'string' ? false : undefined;
    };

    expect(isMatchWith(['a'], ['a'], customizer)).toBe(false);
    expect(isMatchWith({ 0: 'a' }, { 0: 'a' }, customizer)).toBe(false);
  });

  it('should return a boolean value even when `customizer` does not', () => {
    const object = { a: 1 };
    const actual = isMatchWith(object, { a: 1 }, stubA);

    expect(actual).toBe(true);

    const expected = lodashStable.map(falsey, stubFalse);

    const actualArray: boolean[] = [];
    lodashStable.each(falsey, (value: unknown) => {
      actualArray.push(isMatchWith(object, { a: 2 }, lodashStable.constant(value)));
    });

    expect(actualArray).toEqual(expected);
  });

  it('should provide `stack` to `customizer`', () => {
    let actual: unknown;

    isMatchWith({ a: 1 }, { a: 1 }, function (...args: unknown[]) {
      actual = last(args);
    });

    expect(actual && typeof actual.constructor === 'function').toBe(true);
  });

  it('should ensure `customizer` is a function', () => {
    const object = { a: 1 };
    const matches = partial(isMatchWith, object);
    const actual = lodashStable.map([object, { a: 2 }], matches);

    expect(actual).toEqual([true, false]);
  });

  it('should call `customizer` for values maps and sets', () => {
    const value = { a: { b: 2 } };

    let map1: Map<string, unknown> | undefined;
    let map2: Map<string, unknown> | undefined;
    let set1: Set<unknown> | undefined;
    let set2: Set<unknown> | undefined;

    if (Map) {
      map1 = new Map();
      map1.set('a', value);

      map2 = new Map();
      map2.set('a', value);
    }
    if (Set) {
      set1 = new Set();
      set1.add(value);

      set2 = new Set();
      set2.add(value);
    }
    lodashStable.each(
      [
        [map1, map2],
        [set1, set2],
      ],
      (pair: any) => {
        if (pair[0]) {
          const argsList: any[] = [];

          const minimumExpectedCalls = 2;
          isMatchWith({ a: pair[0] }, { a: pair[1] }, function (...args: unknown[]) {
            argsList.push(args.slice(0, -1));
          });

          expect(argsList.length).toBeGreaterThanOrEqual(minimumExpectedCalls);
          expect(argsList[0][0]).toBe(pair[0]);
          expect(argsList[0][1]).toBe(pair[1]);
          expect(argsList[0][2]).toBe('a');
        }
      }
    );
  });

  it('should handle primitive value comparisons', () => {
    expect(isMatchWith(1, 1)).toBe(true);
    expect(isMatchWith(1, 2)).toBe(false);
    expect(isMatchWith('a', 'a')).toBe(true);
    expect(isMatchWith('a', 'b')).toBe(false);

    expect(isMatchWith({}, 0)).toBe(true);
    expect(isMatchWith({}, false)).toBe(true);
    expect(isMatchWith({}, null)).toBe(true);
    expect(isMatchWith({}, 'abc')).toBe(false);
    expect(isMatchWith({}, 123)).toBe(true);
  });

  it('should handle arrays', () => {
    expect(isMatchWith([1, 2, 3], [1, 2])).toBe(true);
    expect(isMatchWith([1, 2], [1, 2, 3])).toBe(false);
    expect(isMatchWith({}, [1, 2])).toBe(false);
    expect(isMatchWith([{ id: 1 }, { id: 2 }, { id: 3 }], [{ id: 1 }, { id: 99 }], stubFalse)).toBe(false);

    const customizer = (objValue: unknown, srcValue: unknown) => (objValue === 1 && srcValue === 1 ? false : undefined);
    expect(isMatchWith([1, 2, 3], [1], customizer)).toBe(false);

    const indexCustomizer = (objValue: unknown, srcValue: unknown, key: unknown) =>
      key === 0 && objValue === 2 && srcValue === 2 ? false : undefined;
    expect(isMatchWith([1, 2, 3], [2], indexCustomizer)).toBe(false);
  });

  it('should handle Map', () => {
    const map1 = new Map([['a', 1]]);
    const map2 = new Map([['a', 1]]);
    const map3 = new Map([['a', 2]]);

    expect(isMatchWith(map1, map2)).toBe(true);
    expect(isMatchWith(map1, map3)).toBe(false);
    expect(isMatchWith({}, new Map())).toBe(true);
    expect(isMatchWith(new Map([['a', 1]]), new Map([['b', 2]]))).toBe(false);

    const keyTrueCustomizer = (objValue: any, srcValue: any, key: any) => (key === 'a' ? true : undefined);
    const keyFalseCustomizer = (objValue: any, srcValue: any, key: any) => (key === 'a' ? false : undefined);

    expect(isMatchWith(map1, map3, keyTrueCustomizer)).toBe(true);
    expect(isMatchWith(map1, map3, keyFalseCustomizer)).toBe(false);

    expect(
      isMatchWith(
        new Map([
          ['a', 1],
          ['b', 2],
        ]),
        new Map([
          ['a', 3],
          ['b', 4],
        ]),
        stubFalse
      )
    ).toBe(false);
  });

  it('should handle Set', () => {
    const set1 = new Set([1, 2]);
    const set2 = new Set([1, 2]);
    const set3 = new Set([1, 3]);

    expect(isMatchWith(set1, set2)).toBe(true);
    expect(isMatchWith(set1, set3)).toBe(false);
    expect(isMatchWith({}, new Set())).toBe(true);
    expect(isMatchWith(new Set([1]), new Set([1, 2, 3]))).toBe(false);
    expect(isMatchWith(new Set([1, 2]), new Set([99]))).toBe(false);

    const valueCustomizer = (objValue: any, srcValue: any) => (objValue === 1 && srcValue === 3 ? true : undefined);
    expect(isMatchWith(new Set([1, 2]), new Set([3]), valueCustomizer)).toBe(true);
    expect(isMatchWith(new Set([1, 2]), new Set([3, 4]), stubFalse)).toBe(false);
    expect(isMatchWith(new Set([1, 2, 3]), new Set([1]), stubFalse)).toBe(false);
  });

  it('should handle functions', () => {
    function fn1() {}
    function fn2() {}
    fn1.a = 1;

    expect(isMatchWith(fn1, fn2)).toBe(false);
    expect(isMatchWith(fn1, { a: 1 })).toBe(true);
    expect(isMatchWith({}, fn1)).toBe(false);

    const fnWithProps = function () {};
    fnWithProps.prop1 = 'value1';
    fnWithProps.prop2 = 'value2';

    expect(isMatchWith({ prop1: 'value1', prop2: 'value2' }, fnWithProps)).toBe(true);
    expect(isMatchWith(fnWithProps, { prop1: 'value1' })).toBe(true);
  });

  it('should handle null and undefined', () => {
    expect(isMatchWith({ a: 1 }, null)).toBe(true);
    expect(isMatchWith(null, null)).toBe(true);
    expect(isMatchWith(undefined, null)).toBe(true);
    expect(isMatchWith(null, { a: 1 })).toBe(false);
  });

  it('should handle object property matching', () => {
    expect(isMatchWith({ a: 1, b: 2 }, { a: 1 })).toBe(true);
    expect(isMatchWith({ a: 1 }, { b: 2 })).toBe(false);
    expect(isMatchWith({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);

    expect(isMatchWith({ a: undefined }, { a: undefined })).toBe(true);
    expect(isMatchWith({ a: null }, { a: null })).toBe(true);
    expect(isMatchWith({ a: 1 }, { a: undefined })).toBe(false);
    expect(isMatchWith({ a: 1 }, { a: null })).toBe(false);

    const rootCustomizer = (objValue: unknown, srcValue: unknown, key: unknown) => (key === 'root' ? true : undefined);
    expect(isMatchWith({}, {}, rootCustomizer)).toBe(true);
  });

  it('should handle empty collections', () => {
    expect(isMatchWith([1, 2, 3], [])).toBe(true);
    expect(isMatchWith([], [])).toBe(true);
    expect(isMatchWith({}, [])).toBe(true);

    expect(isMatchWith({ arr: [1, 2, 3] }, { arr: [] })).toBe(true);
    expect(isMatchWith({ arr: [] }, { arr: [] })).toBe(true);

    const customizer = () => undefined;
    expect(isMatchWith([1, 2, 3], [], customizer)).toBe(true);
    expect(isMatchWith([], [], customizer)).toBe(true);

    expect(isMatchWith([1, 2, 3], [], stubTrue)).toBe(true);

    expect(isMatchWith(new Map([['a', 1]]), new Map())).toBe(true);
    expect(isMatchWith([], new Map())).toBe(true);
    expect(isMatchWith({}, new Set())).toBe(true);
    expect(isMatchWith(123, new Set())).toBe(true);
  });

  it('should handle Map with customizer returning undefined and mismatched values', () => {
    const map1 = new Map([
      ['a', { x: 1 }],
      ['b', { y: 2 }],
    ]);
    const map2 = new Map([
      ['a', { x: 2 }],
      ['b', { y: 3 }],
    ]);

    const customizer = (objValue: unknown, srcValue: unknown) => {
      if (typeof objValue === 'object' && typeof srcValue === 'object') {
        return;
      }
    };

    expect(isMatchWith(map1, map2, customizer)).toBe(false);
  });

  it('should handle type mismatches', () => {
    const source = new Map([['key', 'value']]);
    expect(isMatchWith([], source)).toBe(false);
    expect(isMatchWith({}, source)).toBe(false);
    expect(isMatchWith('string', source)).toBe(false);
    expect(isMatchWith(123, source)).toBe(false);
    expect(isMatchWith(new Set(), source)).toBe(false);

    const setSource = new Set([1, 2, 3]);
    expect(isMatchWith([], setSource)).toBe(false);
    expect(isMatchWith({}, setSource)).toBe(false);
    expect(isMatchWith('string', setSource)).toBe(false);
    expect(isMatchWith(123, setSource)).toBe(false);
    expect(isMatchWith(new Map(), setSource)).toBe(false);
  });

  it('should handle comparisons without customizer', () => {
    expect(isMatchWith(new Map([['a', { nested: 1 }]]), new Map([['a', { nested: 2 }]]))).toBe(false);
    expect(isMatchWith([{ id: 1 }, { id: 2 }, { id: 3 }], [{ id: 2 }])).toBe(true);

    const map1 = new Map([
      ['key1', { nested: 'value1' }],
      ['key2', { nested: 'value2' }],
    ]);
    const map2 = new Map([
      ['key1', { nested: 'value1' }],
      ['key2', { nested: 'value2' }],
    ]);
    const map3 = new Map([
      ['key1', { nested: 'value1' }],
      ['key2', { nested: 'different' }],
    ]);

    expect(isMatchWith(map1, map2)).toBe(true);
    expect(isMatchWith(map1, map3)).toBe(false);
  });

  it('should match when source is empty object and target is primitive', () => {
    expect(isMatchWith(42, {})).toBe(true);
    expect(isMatchWith(42, {}, lodashStable.noop)).toBe(true);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(isMatchWith).toEqualTypeOf<typeof isMatchWithLodash>();
  });
});
