import { describe, expect, expectTypeOf, it } from 'vitest';
import { overArgs } from 'es-toolkit/compat';
import type { overArgs as overArgsLodash } from 'lodash';
import { slice } from '../_internal/slice';

describe('overArgs', () => {
  function fn() {
    // eslint-disable-next-line prefer-rest-params
    return slice.call(arguments);
  }

  function doubled(n: number) {
    return n * 2;
  }

  function square(n: number) {
    return n * n;
  }

  it('should transform each argument', () => {
    const over = overArgs(fn, [doubled, square]);
    expect(over(5, 10)).toEqual([10, 100]);
  });

  it('should use identity when a predicate is nullish', () => {
    const over = overArgs(fn, [undefined, null] as any[]);
    expect(over('a', 'b')).toEqual(['a', 'b']);
  });

  it('should work with property shorthands', () => {
    const over = overArgs(fn, ['b', 'a'] as any[]);
    expect(over({ b: 2 }, { a: 1 })).toEqual([2, 1]);
  });

  it('should work with matches shorthands', () => {
    const over = overArgs(fn, [{ b: 1 }, { a: 1 }] as any[]);
    expect(over({ b: 2 }, { a: 1 })).toEqual([false, true]);
  });

  it('should work with matchesProperty shorthands', () => {
    const over = overArgs(fn, [
      ['b', 1],
      ['a', 1],
    ] as any[]);
    expect(over({ b: 2 }, { a: 1 })).toEqual([false, true]);
  });

  it('should differentiate between property and matchesProperty shorthands', () => {
    let over = overArgs(fn, ['a', 1] as any[]);
    expect(over({ a: 1 }, { 1: 2 })).toEqual([1, 2]);

    over = overArgs(fn, [['a', 1]] as any[]);
    expect(over({ a: 1 })).toEqual([true]);
  });

  it('should flatten transforms', () => {
    const over = overArgs(fn, [doubled, square, String]);
    expect(over(5, 10, 15)).toEqual([10, 100, '15']);
  });

  it('should not transform any argument greater than the number of transforms', () => {
    const over = overArgs(fn, [doubled, square]);
    expect(over(5, 10, 18)).toEqual([10, 100, 18]);
  });

  it('should not transform any arguments if no transforms are given', () => {
    const over = overArgs(fn, []);
    expect(over(5, 10, 18)).toEqual([5, 10, 18]);
  });

  it('should not pass undefined if there are more transforms than arguments', () => {
    const over = overArgs(fn, [doubled]);
    expect(over(5)).toEqual([10]);
  });

  it('should provide the correct argument to each transform', () => {
    const argsList: any[] = [];
    const transform = function (this: any) {
      // eslint-disable-next-line prefer-rest-params
      argsList.push(slice.call(arguments));
    };
    const over = overArgs(fn, [transform, transform, transform]);

    over('a', 'b');
    expect(argsList).toEqual([['a'], ['b']]);
  });

  it('should use this binding of function for transforms', () => {
    const over = overArgs(
      function (this: any, x: any) {
        return this[x];
      },
      [
        function (this: any, x: any) {
          return this === x;
        },
      ]
    );

    const object = { over: over, true: 1 };
    expect(object.over(object)).toBe(1);
  });

  it('should transform each argument with the corresponding transform function', () => {
    const func = overArgs((x, y) => [x, y], [doubled, square]);

    expect(func(5, 3)).toEqual([10, 9]);
    expect(func(10, 5)).toEqual([20, 25]);
  });

  it('should maintain `this` binding', () => {
    const object = {
      value: 10,
    };

    const func = overArgs(
      function (this: any, x: number) {
        return this.value + x;
      },
      [doubled]
    );

    expect(func.call(object, 5)).toBe(object.value + doubled(5));
  });

  it('should transform only the first n arguments where n is the number of transforms', () => {
    const func = overArgs((a, b, c) => [a, b, c], [doubled, square]);

    expect(func(5, 3, 2)).toEqual([10, 9, 2]);
  });

  it('should use identity function for nonexistent transforms', () => {
    const func = overArgs((a, b) => [a, b], [doubled]);

    expect(func(5, 3)).toEqual([10, 3]);
  });

  it('should use identity function if transforms is empty', () => {
    const func = overArgs((a, b) => [a, b], []);

    expect(func(5, 3)).toEqual([5, 3]);
  });

  it('should treat nullish transforms as identity function', () => {
    const transforms = [doubled, null, undefined] as any;

    const func = overArgs((a, b, c, d) => [a, b, c, d], transforms);

    expect(func(1, 2, 3, 4)).toEqual([2, 2, 3, 4]);
  });

  it('should support property shorthand', () => {
    const user = { name: 'John', age: 30 };
    const func = overArgs((name, age) => `${name} is ${age} years old`, ['name', 'age'] as any[]);

    expect(func(user, user)).toBe('John is 30 years old');
  });

  it('should throw TypeError if func is not a function', () => {
    expect(() => {
      // @ts-expect-error: Testing runtime behavior with incorrect types
      overArgs(null, [doubled]);
    }).toThrow(TypeError);
  });

  it('should handle transforms that are not an array', () => {
    const func = overArgs((a, b) => [a, b], doubled as any);

    expect(func(5, 3)).toEqual([10, 3]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(overArgs).toEqualTypeOf<typeof overArgsLodash>();
  });
});
