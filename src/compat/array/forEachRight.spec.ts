import { describe, expect, it } from 'vitest';
import { forEachRight } from './forEachRight';
import { includes } from './includes';
import { map } from './map';
import { MAX_SAFE_INTEGER } from '../_internal/MAX_SAFE_INTEGER';
import { stubTrue } from '../util/stubTrue';

describe('forEachRight', () => {
  it(`should provide correct iteratee arguments`, () => {
    const array = [1, 2, 3];
    let args: any[];
    const expected = [3, 2, array];

    forEachRight(array, function (..._args: any[]) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      args || (args = _args);
    });

    expect(args!).toEqual(expected);
  });

  it(`should treat sparse arrays as dense`, () => {
    const array = [1];
    array[2] = 3;

    const expected = [
      [1, 0, array],
      [undefined, 1, array],
      [3, 2, array],
    ];
    expected.reverse();

    const argsList: any[] = [];
    forEachRight(array, function (...args: any[]) {
      argsList.push(args);
      return true;
    });

    expect(argsList).toEqual(expected);
  });

  it(`should not iterate custom properties on arrays`, () => {
    const array: any = [1, 2, 3];
    array.a = 1;
    const keys: any[] = [];
    forEachRight(array, (value, key) => {
      keys.push(key);
      return false;
    });

    expect(includes(keys, 'a')).toBeFalsy();
  });

  it(`iterates over own string keyed properties of objects`, () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const values: any[] = [];
    // @ts-expect-error - Foo is not a constructor
    forEachRight(new Foo(), value => {
      values.push(value);
    });
    expect(values).toEqual([1]);
  });

  it(`should return the collection`, () => {
    const array = [1, 2, 3];
    expect(forEachRight(array, Boolean)).toBe(array);
  });

  it(`should use \`isArrayLike\` to determine whether a value is array-like`, () => {
    const isIteratedAsObject = function (object: any) {
      let result = false;
      forEachRight(object, () => {
        result = true;
      });
      return result;
    };

    const values = [-1, '1', 1.1, Object(1), MAX_SAFE_INTEGER + 1];
    const expected = map(values, stubTrue);

    const actual = map(values, length => isIteratedAsObject({ length: length }));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const Foo = function (a: any) {};
    Foo.a = 1;

    expect(actual).toEqual(expected);
    expect(isIteratedAsObject(Foo)).toBeTruthy();
    expect(isIteratedAsObject({ length: 0 })).toBeFalsy();
  });

  it(`should ignore changes to \`length\``, () => {
    let count = 0;
    const array = [1];

    forEachRight(array, () => {
      if (++count === 1) {
        array.push(2);
      }
      return true;
    });

    expect(count).toBe(1);
  });

  it(`should ignore added \`object\` properties`, () => {
    let count = 0;
    const object = { a: 1 };

    forEachRight(object, () => {
      if (++count === 1) {
        // @ts-expect-error - Property 'b' does not exist on type '{ a: number; }'.
        object.b = 2;
      }
      return true;
    });

    expect(count).toBe(1);
  });
});
