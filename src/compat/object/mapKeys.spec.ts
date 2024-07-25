
import { describe, expect, it } from 'vitest';
import { mapKeys } from './mapKeys';

describe('mapKeys', () => {
  const array = [1, 2];
  const object = { a: 1, b: 2 };

  it('should map keys in `object` to a new object', () => {
    const actual = mapKeys(object, String);
    expect(actual).toEqual({ 1: 1, 2: 2 });
  });

  it('should treat arrays like objects', () => {
    const actual = mapKeys(array, String);
    expect(actual).toEqual({ 1: 1, 2: 2 });
  });

  it('should work with `_.property` shorthands', () => {
    const actual = mapKeys({ a: { b: 'c' } }, 'b');
    expect(actual).toEqual({ c: { b: 'c' } });
  });

  it('should use `_.identity` when `iteratee` is nullish', () => {
    const object = { a: 1, b: 2 };
    const values = [, null, undefined];
    const expected = values.map(() => ({ 1: 1, 2: 2 }))

    const actual = values.map((value, index) =>
      // eslint-disable-next-line
      // @ts-ignore
      index ? mapKeys(object, value) : mapKeys(object),
    );

    expect(actual).toEqual(expected);
  });
});
