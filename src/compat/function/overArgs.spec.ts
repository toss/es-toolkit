import { describe, expect, it } from 'vitest';
import { overArgs } from './overArgs';

describe('overArgs', () => {
  function doubled(n: number) {
    return n * 2;
  }

  function square(n: number) {
    return n * n;
  }

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
    const transforms = [doubled, null, undefined];

    const func = overArgs((a, b, c, d) => [a, b, c, d], transforms);

    expect(func(1, 2, 3, 4)).toEqual([2, 2, 3, 4]);
  });

  it('should support property shorthand', () => {
    const user = { name: 'John', age: 30 };
    const func = overArgs((name, age) => `${name} is ${age} years old`, ['name', 'age']);

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
});
