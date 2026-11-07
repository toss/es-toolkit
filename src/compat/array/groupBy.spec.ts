import { describe, expect, it } from 'vitest';
import * as lodashStable from 'es-toolkit/compat';
import { groupBy } from './groupBy';

describe('groupBy', () => {
  const array = [6.1, 4.2, 6.3];

  it('should transform keys by `iteratee`', () => {
    const actual = groupBy(array, Math.floor);
    expect(actual).toEqual({ 4: [4.2], 6: [6.1, 6.3] });
  });

  it('should use `_.identity` when `iteratee` is nullish', () => {
    const array = [6, 4, 6];
    // eslint-disable-next-line
    const values = [, null, undefined];
    const expected = lodashStable.map(values, lodashStable.constant({ 4: [4], 6: [6, 6] }));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const actual = lodashStable.map(values, (value, index) => (index ? groupBy(array, value) : groupBy(array)));

    expect(actual).toEqual(expected);
  });

  it('should work with `_.property` shorthands', () => {
    const actual = groupBy(['one', 'two', 'three'], 'length');
    expect(actual).toEqual({ 3: ['one', 'two'], 5: ['three'] });
  });

  it('should only add values to own, not inherited, properties', () => {
    const actual = groupBy(array, n => (Math.floor(n) > 4 ? 'hasOwnProperty' : 'constructor'));

    expect(actual.constructor).toEqual([4.2]);
    expect(actual.hasOwnProperty).toEqual([6.1, 6.3]);
  });

  it('should work with a number for `iteratee`', () => {
    const array = [
      [1, 'a'],
      [2, 'a'],
      [2, 'b'],
    ];

    expect(groupBy(array, 0)).toStrictEqual({
      1: [[1, 'a']],
      2: [
        [2, 'a'],
        [2, 'b'],
      ],
    });
    expect(groupBy(array, 1)).toStrictEqual({
      a: [
        [1, 'a'],
        [2, 'a'],
      ],
      b: [[2, 'b']],
    });
  });

  it('should work with an object for `collection`', () => {
    const actual = groupBy({ a: 6.1, b: 4.2, c: 6.3 }, Math.floor);
    expect(actual).toEqual({ 4: [4.2], 6: [6.1, 6.3] });
  });

  it('should return empty object if null or undefined is passed', () => {
    expect(groupBy(undefined)).toEqual({});
    expect(groupBy(null)).toEqual({});
  });

  it('should call the iteratee with only the element, like lodash', () => {
    const args: unknown[][] = [];
    groupBy(['a', 'b'], (...rest: unknown[]) => {
      args.push(rest);
      return 'key';
    });
    expect(args).toEqual([['a'], ['b']]);

    // `parseInt` would treat an index as its radix
    expect(groupBy(['10', '11', '12'], parseInt)).toEqual({ 10: ['10'], 11: ['11'], 12: ['12'] });
  });

  it('should preserve own __proto__ key without setting the prototype', () => {
    const array = [
      { k: '__proto__', v: 1 },
      { k: '__proto__', v: 2 },
      { k: 'ok', v: 3 },
    ];

    const result = groupBy(array, item => item.k);

    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Array.isArray(Object.getPrototypeOf(result))).toBe(false);
    expect(Object.keys(result)).toEqual(['__proto__', 'ok']);
    expect(result['__proto__']).toEqual([
      { k: '__proto__', v: 1 },
      { k: '__proto__', v: 2 },
    ]);
    expect(result.ok).toEqual([{ k: 'ok', v: 3 }]);
  });
});
