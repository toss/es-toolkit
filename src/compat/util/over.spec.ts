import { describe, expect, it } from 'vitest';
import { over } from './over';

describe('over', () => {
  it('should create a function that invokes `iteratees`', () => {
    const func = over([Math.max, Math.min]);
    expect(func(1, 2, 3, 4)).toEqual([4, 1]);
  });

  it('should use `identity` when a predicate is nullish', () => {
    const func = over([undefined as any, null as any]);
    expect(func('a', 'b', 'c')).toEqual(['a', 'a']);
  });

  it('should work with `property` shorthands', () => {
    const func = over(['b', 'a']);
    expect(func({ a: 1, b: 2 })).toEqual([2, 1]);
  });

  it('should work with `matches` shorthands', () => {
    const func = over([{ b: 1 }, { a: 1 }]);
    expect(func({ a: 1, b: 2 })).toEqual([false, true]);
  });

  it('should work with `matchesProperty` shorthands', () => {
    const func = over([
      ['b', 2],
      ['a', 2],
    ]);

    expect(func({ a: 1, b: 2 })).toEqual([true, false]);
    expect(func({ a: 2, b: 1 })).toEqual([false, true]);
  });

  it('should differentiate between `property` and `matchesProperty` shorthands', () => {
    let func = over(['a', 1]);

    expect(func({ a: 1, 1: 2 })).toEqual([1, 2]);
    expect(func({ a: 2, 1: 1 })).toEqual([2, 1]);

    func = over([['a', 1]]);

    expect(func({ a: 1 })).toEqual([true]);
    expect(func({ a: 2 })).toEqual([false]);
  });

  it('should provide arguments to predicates', () => {
    const func = over([
      function (...args: unknown[]) {
        return args;
      },
    ]);

    expect(func('a', 'b', 'c')).toEqual([['a', 'b', 'c']]);
  });

  it('should use `this` binding of function for `iteratees`', () => {
    const func = over([
      function (this: any) {
        return this.b;
      },
      function (this: any) {
        return this.a;
      },
    ]);
    const object = { func, a: 1, b: 2 };

    expect(object.func()).toEqual([2, 1]);
  });

  it('should return an empty array if no iteratees are provided', () => {
    const emptyFunc = over([]);
    expect(emptyFunc(1, 2, 3)).toEqual([]);
  });
});
