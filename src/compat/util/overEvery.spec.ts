import { describe, expect, it } from 'vitest';
import { overEvery } from './overEvery';
import { stubFalse } from './stubFalse';
import { stubTrue } from './stubTrue';
import { slice } from '../_internal/slice';
import { stubA } from '../_internal/stubA';
import { stubOne } from '../_internal/stubOne';

describe('overEvery', () => {
  it('should create a function that returns `true` if all predicates return truthy', () => {
    // @ts-expect-error - invalid argument
    const over = overEvery(stubTrue, stubOne, stubA);
    expect(over()).toBe(true);
  });

  it('should return `false` as soon as a predicate returns falsey', () => {
    let count = 0;
    const countFalse = function () {
      count++;
      return false;
    };
    const countTrue = function () {
      count++;
      return true;
    };
    const over = overEvery(countTrue, countFalse, countTrue);

    expect(over()).toBe(false);
    expect(count).toBe(2);
  });

  it('should use `_.identity` when a predicate is nullish', () => {
    // @ts-expect-error - invalid argument
    const over = overEvery(undefined, null);

    expect(over(true)).toBe(true);
    expect(over(false)).toBe(false);
  });

  it('should work with `_.property` shorthands', () => {
    // @ts-expect-error - invalid argument
    const over = overEvery('b', 'a');

    expect(over({ a: 1, b: 1 })).toBe(true);
    expect(over({ a: 0, b: 1 })).toBe(false);
  });

  it('should work with `_.matches` shorthands', () => {
    // @ts-expect-error - invalid argument
    const over = overEvery({ b: 2 }, { a: 1 });

    expect(over({ a: 1, b: 2 })).toBe(true);
    expect(over({ a: 0, b: 2 })).toBe(false);
  });

  it('should work with `_.matchesProperty` shorthands', () => {
    const over = overEvery([
      // @ts-expect-error - invalid argument
      ['b', 2],
      // @ts-expect-error - invalid argument
      ['a', 1],
    ]);

    expect(over({ a: 1, b: 2 })).toBe(true);
    expect(over({ a: 0, b: 2 })).toBe(false);
  });

  it('should differentiate between `_.property` and `_.matchesProperty` shorthands', () => {
    // @ts-expect-error - invalid argument
    let over = overEvery(['a', 1]);

    expect(over({ a: 1, 1: 1 })).toBe(true);
    expect(over({ a: 1, 1: 0 })).toBe(false);
    expect(over({ a: 0, 1: 1 })).toBe(false);

    // @ts-expect-error - invalid argument
    over = overEvery([['a', 1]]);

    expect(over({ a: 1 })).toBe(true);
    expect(over({ a: 2 })).toBe(false);
  });

  it('should flatten `predicates`', () => {
    const over = overEvery(stubTrue, [stubFalse]);
    expect(over()).toBe(false);
  });

  it('should provide arguments to predicates', () => {
    let args;

    // @ts-expect-error - invalid argument
    const over = overEvery(function () {
      // eslint-disable-next-line prefer-rest-params
      args = slice.call(arguments);
    });

    over('a', 'b', 'c');
    expect(args).toEqual(['a', 'b', 'c']);
  });

  it('should use `this` binding of function for `predicates`', () => {
    const over = overEvery(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function (this: any) {
        return this.b;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function (this: any) {
        return this.a;
      }
    );
    const object = { over: over, a: 1, b: 2 };

    expect(object.over()).toBe(true);

    object.a = 0;
    expect(object.over()).toBe(false);
  });
});
