import { describe, expect, it } from 'vitest';
import { invertBy } from './invertBy.ts';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/invertBy.spec.js
 */

describe('invertBy', () => {
  const object = { a: 1, b: 2, c: 1 };

  it('should transform keys by `iteratee`', () => {
    const expected = { group1: ['a', 'c'], group2: ['b'] };

    const actual = invertBy(object, value => `group${value}`);

    expect(actual).toEqual(expected);
  });

  it('should use `identity` when `iteratee` is nullish', () => {
    const values = [undefined, null];
    const expected = values.map(() => ({ '1': ['a', 'c'], '2': ['b'] }));

    const actual = values.map((value, index) => (index ? invertBy(object, value as any) : invertBy(object)));

    expect(actual).toEqual(expected);
  });

  it('should only add multiple values to own, not inherited, properties', () => {
    const objectWithInheritedProps = { a: 'hasOwnProperty', b: 'constructor' };
    const expected = { hasOwnProperty: ['a'], constructor: ['b'] };

    const actual = invertBy(objectWithInheritedProps);

    expect(actual).toEqual(expected);
  });

  it('should return an empty object for nullish values', () => {
    // @ts-expect-error - nullish value
    expect(invertBy(null)).toEqual({});
    // @ts-expect-error - nullish value
    expect(invertBy(undefined)).toEqual({});
  });
});
