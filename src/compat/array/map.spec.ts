import { describe, expect, it } from 'vitest';
import { constant, each } from '..';
import { map } from './map';
import { identity } from '../../function/identity';
import { falsey } from '../_internal/falsey';
import { stubArray } from '../_internal/stubArray';

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
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    // @ts-expect-error - Foo is not a constructor
    const actual = map(new Foo(), identity);
    expect(actual).toEqual([1]);
  });

  it('should use `_.identity` when `iteratee` is nullish', () => {
    const object = { a: 1, b: 2 };
    const values = [, null, undefined];
    const expected = values.map(constant([1, 2]));

    each([array, object], collection => {
      const actual = values.map((value, index) => (index ? map(collection, value) : map(collection)));

      expect(actual).toEqual(expected);
    });
  });

  it('should accept a falsey `collection`', () => {
    const expected = falsey.map(stubArray);

    const actual = falsey.map((collection, index) => {
      try {
        // @ts-expect-error - invalid types
        return index ? map(collection as any) : map();
      } catch (e) {}
    });

    expect(actual).toEqual(expected);
  });

  it('should treat number values for `collection` as empty', () => {
    // @ts-expect-error - invalid types
    expect(map(1)).toEqual([]);
  });

  // it('should treat a nodelist as an array-like object', () => {
  //   if (document) {
  //     const actual = map(document.getElementsByTagName('body'), element => element.nodeName.toLowerCase());

  //     expect(actual).toEqual(['body']);
  //   }
  // });

  it('should work with objects with non-number length properties', () => {
    const value = { value: 'x' };
    const object = { length: { value: 'x' } };

    expect(map(object, identity)).toEqual([value]);
  });
});
