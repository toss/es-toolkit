import { describe, expect, it } from 'vitest';
import { falsey } from '../_internal/falsey';
import { identity } from '../_internal/identity';
import { map } from '../index';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/map.spec.js
 */
describe('map', () => {
  const array = [1, 2];

  it('should map values in `collection` to a new array', () => {
    const object = { a: 1, b: 2 };
    const expected = ['1', '2'];

    expect(map(array, String)).toEqual(expected);
    expect(map(object, String)).toEqual(expected);
  });

  it('should work with `_.property` shorthands', () => {
    const objects = [{ a: 'x' }, { a: 'y' }];
    expect(map(objects, 'a')).toEqual(['x', 'y']);
  });

  it('should iterate over own string keyed properties of objects', () => {
    class Foo {
      static b = 2;
      a: number;

      constructor() {
        this.a = 1;
      }

      [key: string]: unknown;
    }

    const actual = map(new Foo(), identity);
    expect(actual).toEqual([1]);
  });

  it('should use `_.identity` when `iteratee` is nullish', () => {
    const object = { a: 1, b: 2 };
    const values = [null, undefined];
    const expected = values.map(() => [1, 2]);

    [array, object].forEach(collection => {
      const actual = values.map((value, index) => (index ? map(collection, value) : map(collection)));

      expect(actual).toEqual(expected);
    });
  });

  it('should accept a falsey `collection`', () => {
    const expected = falsey.map(() => []);

    const actual = (falsey as any[]).map((collection, index) => {
      try {
        return index ? map(collection) : map(null);
      } catch (e) {
        return e;
      }
    });

    expect(actual).toEqual(expected);
  });

  it('should treat number values for `collection` as empty', () => {
    expect(map(1)).toEqual([]);
  });

  it('should work with objects with non-number length properties', () => {
    const value = { value: 'x' };
    const object = { length: { value: 'x' } };

    expect(map(object, identity)).toEqual([value]);
  });
});
