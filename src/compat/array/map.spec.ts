import { describe, expect, it } from 'vitest';
import { constant, each, stubArray } from '..';
import { map } from './map';
import { identity } from '../../function/identity';
import { falsey } from '../_internal/falsey';
import { MAX_SAFE_INTEGER } from '../_internal/MAX_SAFE_INTEGER';

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
    const objects2 = [{ 1: 'x' }, { 1: 'y' }];
    expect(map(objects2, 1)).toEqual(['x', 'y']);
    const object3 = [{ [Symbol.for('a')]: 'x' }, { [Symbol.for('a')]: 'y' }];
    expect(map(object3, Symbol.for('a'))).toEqual(['x', 'y']);
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
    // eslint-disable-next-line no-sparse-arrays
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
      // @ts-expect-error - invalid types
      return index ? map(collection as any) : map();
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

  it('should accept an object iteratee', () => {
    const object = [{ a: 1 }, { a: 2 }, { a: 1 }];
    const expected = [true, false, true];

    expect(map(object, { a: 1 })).toEqual(expected);
  });

  it('should accept a string as the collection', () => {
    const actual = map('abc', identity);
    expect(actual).toEqual(['a', 'b', 'c']);
  });

  describe('iteration methods', () => {
    const array = [1, 2, 3];
    const func = map;
    const isFind = false;
    const isSome = false;

    it(`\`map\` should provide correct iteratee arguments`, () => {
      let args: any;
      const expected = [1, 0, array];

      func(array, function () {
        args || (args = Array.prototype.slice.call(arguments));
      });

      expect(args).toEqual(expected);
    });

    it(`\`map\` should treat sparse arrays as dense`, () => {
      const array = [1];
      array[2] = 3;

      let expected = [
        [1, 0, array],
        [undefined, 1, array],
        [3, 2, array],
      ];

      const argsList: any[] = [];
      func(array, function () {
        argsList.push(Array.prototype.slice.call(arguments));
        return !(isFind || isSome);
      });

      expect(argsList).toEqual(expected);
    });

    it(`\`map\` should not iterate custom properties on arrays`, () => {
      const array: any = [1, 2, 3];
      array.a = 1;
      const keys: any = [];
      func(array, (_, key) => {
        keys.push(key);
        return false;
      });

      expect(keys.includes('a')).toBeFalsy();
    });

    it(`\`map\` iterates over own string keyed properties of objects`, () => {
      // eslint-disable-next-line
      // @ts-ignore
      function Foo(this: any) {
        this.a = 1;
      }
      Foo.prototype.b = 2;

      const values: any[] = [];
      // eslint-disable-next-line
      // @ts-ignore
      func(new Foo(), value => {
        values.push(value);
      });
      expect(values).toEqual([1]);
    });

    it(`\`map\` should use \`isArrayLike\` to determine whether a value is array-like`, () => {
      const isIteratedAsObject = function (object: any) {
        let result = false;
        (func as any)(
          object,
          () => {
            result = true;
          },
          0
        );
        return result;
      };

      const values = [-1, '1', 1.1, Object(1), MAX_SAFE_INTEGER + 1];
      const expected = map(values, () => true);

      const actual = map(values, length => isIteratedAsObject({ length: length }));

      const Foo = function () {};
      Foo.a = 1;

      expect(actual).toEqual(expected);
      expect(isIteratedAsObject(Foo)).toBeTruthy();
      expect(isIteratedAsObject({ length: 0 })).toBeFalsy();
    });

    it(`\`map\` should ignore changes to \`length\``, () => {
      let count = 0;
      const array = [1];

      func(array, () => {
        if (++count === 1) {
          array.push(2);
        }
        return !(isFind || isSome);
      });

      expect(count).toBe(1);
    });

    it(`\`map\` should ignore added \`object\` properties`, () => {
      let count = 0;
      const object: any = { a: 1 };

      func(object, () => {
        if (++count === 1) {
          object.b = 2;
        }
        return !(isFind || isSome);
      });

      expect(count).toBe(1);
    });
  });
});
