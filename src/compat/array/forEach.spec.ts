import { describe, expect, it, vi } from 'vitest';
import { forEach } from './forEach';
import { MAX_SAFE_INTEGER } from '../_internal/MAX_SAFE_INTEGER';
import { slice } from '../_internal/slice';
import { stubTrue } from '../_internal/stubTrue';

describe('forEach', () => {
  it('should iterate over array elements', () => {
    const array = [1, 2, 3];
    const result: number[] = [];

    forEach(array, value => {
      result.push(value);
    });

    expect(result).toEqual([1, 2, 3]);
  });

  it('should iterate over string characters', () => {
    const string = 'abc';
    const result: string[] = [];

    forEach(string, value => {
      result.push(value);
    });

    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should iterate over object properties', () => {
    const object = { a: 1, b: 2 };
    const result: Array<[number, string]> = [];

    forEach(object, (value, key) => {
      result.push([value, key]);
    });

    expect(result).toEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
  });

  it('should return the original array after iteration', () => {
    const array = [1, 2, 3];
    const result = forEach(array, value => value * 2);

    expect(result).toBe(array);
  });

  it('should return the original string after iteration', () => {
    const string = 'abc';
    const result = forEach(string, value => value.toUpperCase());

    expect(result).toBe(string);
  });

  it('should return the original object after iteration', () => {
    const object = { a: 1, b: 2 };
    const result = forEach(object, value => value + 1);

    expect(result).toBe(object);
  });

  it('should return the input collection if null or undefined is passed', () => {
    const nullValue = null;
    const undefinedValue = undefined;

    const resultForNull = forEach(nullValue, vi.fn());
    const resultForUndefined = forEach(undefinedValue, vi.fn());

    expect(resultForNull).toBe(null);
    expect(resultForUndefined).toBe(undefined);
  });

  it('should use identity function as the callback if no callback is provided', () => {
    const array = [1, 2, 3];
    const result = forEach(array);

    expect(result).toBe(array);
  });

  it('should iterate over array-like structures', () => {
    const arrayLike = { 0: 'a', 1: 'b', length: 2 };
    const result: Array<[number, string]> = [];

    forEach(arrayLike, (value, index) => {
      result.push([index, value]);
    });

    expect(result).toEqual([
      [0, 'a'],
      [1, 'b'],
    ]);
  });

  const array = [1, 2, 3];
  const func = forEach;
  const methodName = 'forEach';

  it(`\`_.${methodName}\` should provide correct iteratee arguments`, () => {
    let args: any;
    const expected = [1, 0, array];

    func(array, function () {
      args || (args = slice.call(arguments));
    });
    expect(args).toEqual(expected);
  });

  it(`\`_.${methodName}\` should treat sparse arrays as dense`, () => {
    const array = [1];
    array[2] = 3;

    let expected = [
      [1, 0, array],
      [undefined, 1, array],
      [3, 2, array],
    ];

    const argsList: any[] = [];
    func(array, function () {
      argsList.push(slice.call(arguments));
      return true;
    });

    expect(argsList).toEqual(expected);
  });

  const isEvery = false;

  it(`\`_.${methodName}\` should not iterate custom properties on arrays`, () => {
    const array: any = [1, 2, 3];
    array.a = 1;
    const keys: any[] = [];
    func(array, (value, key) => {
      keys.push(key);
      return isEvery;
    });

    expect(keys.includes('a')).toBeFalsy();
  });

  it(`\`_.${methodName}\` iterates over own string keyed properties of objects`, () => {
    function Foo(this: any) {
      // eslint-disable-next-line
      // @ts-ignore
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

  it(`\`_.${methodName}\` should return the collection`, () => {
    const array = [1, 2, 3];
    expect(func(array, Boolean)).toBe(array);
  });

  it(`\`_.${methodName}\` should use \`isArrayLike\` to determine whether a value is array-like`, () => {
    const isIteratedAsObject = function (object: any) {
      let result = false;
      func(object, () => {
        result = true;
      });
      return result;
    };

    const values = [-1, '1', 1.1, Object(1), MAX_SAFE_INTEGER + 1];
    const expected = values.map(stubTrue);

    const actual = values.map(length => isIteratedAsObject({ length: length }));

    const Foo = function (a: any) {};
    Foo.a = 1;

    expect(actual).toEqual(expected);
    expect(isIteratedAsObject(Foo)).toBeTruthy();
    expect(isIteratedAsObject({ length: 0 })).toBeFalsy();
  });

  it(`\`_.${methodName}\` should ignore changes to \`length\``, () => {
    if (func) {
      let count = 0;
      const array = [1];

      func(array, () => {
        if (++count === 1) {
          array.push(2);
        }
        return true;
      });

      expect(count).toBe(1);
    }
  });

  it(`\`_.${methodName}\` should ignore added \`object\` properties`, () => {
    let count = 0;
    const object = { a: 1 };

    func(object, () => {
      if (++count === 1) {
        // eslint-disable-next-line
        // @ts-ignore
        object.b = 2;
      }
      return true;
    });

    expect(count).toBe(1);
  });

  it(`\`_.${methodName}\` can exit early when iterating arrays`, () => {
    const array = [1, 2, 3];
    const values: any[] = [];

    func(array, (value, other) => {
      values.push(Array.isArray(value) ? other : value);
      return false;
    });

    expect(values).toEqual([1]);
  });

  it(`\`_.${methodName}\` can exit early when iterating objects`, () => {
    const object = { a: 1, b: 2, c: 3 };
    const values = [];

    func(object, (value, other) => {
      values.push(Array.isArray(value) ? other : value);
      return false;
    });

    expect(values.length).toBe(1);
  });
});
