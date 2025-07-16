import { describe, expect, expectTypeOf, it } from 'vitest';
import type { some as someLodash } from 'lodash';
import { some } from './some';
import { identity } from '../../function/identity';
import { args } from '../_internal/args';
import { empties } from '../_internal/empties';
import { stubFalse } from '../util/stubFalse';
import { stubTrue } from '../util/stubTrue';

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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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

    expected = values.map(stubFalse);
    actual = values.map((value, index) => {
      const array = { 0: 0, a: 0 };
      return index
        ? // eslint-disable-next-line
          // @ts-ignore
          some(array, value)
        : some(array);
    });

    expect(actual).toEqual(expected);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expected = values.map(stubTrue);
    actual = values.map((value, index) => {
      const array = { 0: 0, a: 1 };
      return index
        ? // eslint-disable-next-line
          // @ts-ignore
          some(array, value)
        : some(array);
    });

    expect(actual).toEqual(expected);
  });

  it('should work with matchesProperty shorthands', () => {
    const objects = [
      { a: 0, b: 0, 0: 0, [Symbol.for('a')]: 0 },
      { a: 0, b: 1, 0: 1, [Symbol.for('a')]: 1 },
    ];

    expect(some(objects, ['a', 0])).toBe(true);
    expect(some(objects, ['b', 1])).toBe(true);
    expect(some(objects, ['b', 2])).toBe(false);

    expect(some(objects, [0, 1])).toBe(true);
    expect(some(objects, [Symbol.for('a'), 1])).toBe(true);
  });

  it('should work with `_.property` shorthands', () => {
    const objects = [
      { a: 0, b: 0, 0: 0, [Symbol.for('a')]: 0 },
      { a: 0, b: 1, 0: 1, [Symbol.for('a')]: 1 },
    ];
    expect(some(objects, 'a')).toBe(false);
    expect(some(objects, 'b')).toBe(true);

    expect(some(objects, 0)).toBe(true);
    expect(some(objects, Symbol.for('a'))).toBe(true);
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

  it('should return true for object with one value passing the predicate', () => {
    expect(some({ a: 1, b: 2, c: 3 }, value => value >= 3)).toBe(true);
  });

  it('should return false for object with all values failing the predicate', () => {
    expect(some({ a: 1, b: 2, c: 3 }, value => value > 3)).toBe(false);
  });

  it('should return true for object with one value matching the partial', () => {
    expect(
      some(
        { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } },
        {
          name: 'Bob',
        }
      )
    ).toBe(true);
  });

  it('should return true for object with one value matching the property', () => {
    expect(some({ a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } }, 'name')).toBe(true);
  });

  it('should return true for object with one value matching the property and value', () => {
    expect(some({ a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } }, ['name', 'Bob'])).toBe(true);
  });

  it('should return false for empty object', () => {
    const result = some({}, () => false);
    expect(result).toBe(false);
  });

  it('should return false when provided `null` or `undefined`', () => {
    expect(some(null, identity)).toBe(false);
    expect(some(undefined, identity)).toBe(false);
  });

  it('should support array-like objects', () => {
    expect(some({ 0: 'a', 1: 'b', length: 2 }, value => value === 'b')).toBe(true);
    expect(some('123', value => value === '3')).toBe(true);
    expect(some(args, value => value === 1)).toBe(true);
  });

  it('should handle sparse arrays correctly', () => {
    // eslint-disable-next-line no-sparse-arrays
    const sparseArray = [1, , 3, , 5] as any[];

    expect(some(sparseArray, value => value > 0)).toEqual(true);
    expect(some(sparseArray, value => value === undefined)).toEqual(true);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(some).toEqualTypeOf<typeof someLodash>();
  });
});
