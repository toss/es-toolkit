import { describe, expect, it } from 'vitest';
import { some } from './some';
import { identity } from '../_internal/identity';
import { stubFalse } from '../_internal/stubFalse';
import { empties } from '../_internal/empties';
import { stubTrue } from '../_internal/stubTrue';

describe('some', () => {
  it('should return `true` if `predicate` returns truthy for any element', () => {
    expect(some([false, 1, ''], identity)).toBe(true);
    expect(some([null, 'a', 0], identity)).toBe(true);
  });

  it('should return `false` for empty collections', () => {
    const expected = empties.map(stubFalse);

    const actual = empties.map(value => {
      try {
        // eslint-disable-next-line
        // @ts-ignore
        return some(value, identity);
      } catch (e) {
        console.log(e);
      }
    });

    expect(actual).toEqual(expected);
  });

  it('should return `true` as soon as `predicate` returns truthy', () => {
    let count = 0;

    expect(
      some([null, true, null], value => {
        count++;
        return value;
      })
    );

    expect(count).toBe(2);
  });

  it('should return `false` if `predicate` returns falsey for all elements', () => {
    expect(some([false, false, false], identity)).toBe(false);
    expect(some([null, 0, ''], identity)).toBe(false);
  });

  it('should use `_.identity` when `predicate` is nullish', () => {
    // eslint-disable-next-line
    const values = [, null, undefined];
    let expected = values.map(stubFalse);

    let actual = values.map((value, index) => {
      const array = [0, 0];
      return index
        ? // eslint-disable-next-line
          // @ts-ignore
          some(array, value)
        : some(array);
    });

    expect(actual).toEqual(expected);

    expected = values.map(stubTrue);
    actual = values.map((value, index) => {
      const array = [0, 1];
      return index
        ? // eslint-disable-next-line
          // @ts-ignore
          some(array, value)
        : some(array);
    });

    expect(actual).toEqual(expected);
  });

  it('should work with `_.property` shorthands', () => {
    const objects = [
      { a: 0, b: 0 },
      { a: 0, b: 1 },
    ];
    expect(some(objects, 'a')).toBe(false);
    expect(some(objects, 'b')).toBe(true);
  });

  it('should work with `_.property` shorthands', () => {
    const objects = [
      { a: 0, b: 0 },
      { a: 0, b: 1 },
    ];
    expect(some(objects, 'a')).toBe(false);
    expect(some(objects, 'b')).toBe(true);
  });

  it('should work with `_.matches` shorthands', () => {
    const objects = [
      { a: 0, b: 0 },
      { a: 1, b: 1 },
    ];
    expect(some(objects, { a: 0 })).toBe(true);
    expect(some(objects, { b: 2 })).toBe(false);
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    const actual = [[1]].map(some);
    expect(actual).toEqual([true]);
  });
});
