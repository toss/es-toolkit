import { describe, expect, expectTypeOf, it } from 'vitest';
import { mapValues } from 'es-toolkit/compat';
import { isEqual } from 'es-toolkit/compat';
import type { mapValues as mapValuesLodash } from 'lodash';

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
      // eslint-disable-next-line
      // @ts-ignore
      const result = index ? mapValues(object, value) : mapValues(object);
      return [isEqual(result, object), result === object];
    });

    expect(actual).toEqual(expected);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(mapValues).toEqualTypeOf<typeof mapValuesLodash>();
  });

  it('should return empty object when object is null', () => {
    expect(mapValues(null)).toEqual({});
  });

  it('should return empty object when object is undefined', () => {
    expect(mapValues(undefined)).toEqual({});
  });
});
