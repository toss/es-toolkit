import { describe, expect, it, expectTypeOf } from 'vitest';
import type { mapValues as mapValuesLodash } from 'lodash';
import { mapValues } from './mapValues';
import { isEqual } from '../../predicate/isEqual';

describe('mapValues', () => {
  const array = [1, 2];
  const object = { a: 1, b: 2 };

  it('should map values in `object` to a new object', () => {
    const actual = mapValues(object, String);
    expect(actual).toEqual({ a: '1', b: '2' });
  });
  it('should treat arrays like objects', () => {
    const actual = mapValues(array, String);
    expect(actual).toEqual({ 0: '1', 1: '2' });
  });

  it('should work with `_.property` shorthands', () => {
    const actual = mapValues({ a: { b: 2 } }, 'b');
    expect(actual).toEqual({ a: 2 });
  });

  it('should use `_.identity` when `iteratee` is nullish', () => {
    const object = { a: 1, b: 2 };
    // eslint-disable-next-line
    const values = [, null, undefined];
    const expected = values.map(() => [true, false]);

    const actual = values.map((value, index) => {
      const result = index ? mapValues(object, value) : mapValues(object);
      return [isEqual(result, object), result === object];
    });

    expect(actual).toEqual(expected);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(mapValues).toEqualTypeOf<typeof mapValuesLodash>();
  });
});
