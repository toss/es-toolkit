import { describe, expect, it, expectTypeOf } from 'vitest';
import type { overSome as overSomeLodash } from 'lodash';
import { overSome } from './overSome';
import { stubFalse } from './stubFalse';
import { stubString } from './stubString';
import { stubTrue } from './stubTrue';
import { slice } from '../_internal/slice';
import { stubA } from '../_internal/stubA';
import { stubNull } from '../_internal/stubNull';
import { stubOne } from '../_internal/stubOne';
import { stubZero } from '../_internal/stubZero';

/**
 * @see https://github.com/lodash/lodash/blob/afcd5bc1e8801867c31a17566e0e0edebb083d0e/test/overSome.spec.js#L1
 */
describe('overSome', () => {
  it('should create a function that returns `true` if any predicates return truthy', () => {
    // @ts-expect-error - invalid argument
    let over = overSome(stubFalse, stubOne, stubString);
    expect(over()).toBe(true);

    // @ts-expect-error - invalid argument
    over = overSome(stubNull, stubA, stubZero);
    expect(over()).toBe(true);
  });

  it('should return `true` as soon as `predicate` returns truthy', () => {
    let count = 0;
    const countFalse = function () {
      count++;
      return false;
    };
    const countTrue = function () {
      count++;
      return true;
    };
    const over = overSome(countFalse, countTrue, countFalse);

    expect(over()).toBe(true);
    expect(count).toBe(2);
  });

  it('should return `false` if all predicates return falsey', () => {
    let over = overSome(stubFalse, stubFalse, stubFalse);
    expect(over()).toBe(false);

    // @ts-expect-error - invalid argument
    over = overSome(stubNull, stubZero, stubString);
    expect(over()).toBe(false);
  });

  it('should use `_.identity` when a predicate is nullish', () => {
    // @ts-expect-error - invalid argument
    const over = overSome(undefined, null);

    expect(over(true)).toBe(true);
    expect(over(false)).toBe(false);
  });

  it('should work with `_.property` shorthands', () => {
    // @ts-expect-error - invalid argument
    const over = overSome('b', 'a');

    expect(over({ a: 1, b: 0 })).toBe(true);
    expect(over({ a: 0, b: 0 })).toBe(false);
  });

  it('should work with `_.matches` shorthands', () => {
    // @ts-expect-error - invalid argument
    const over = overSome({ b: 2 }, { a: 1 });

    expect(over({ a: 0, b: 2 })).toBe(true);
    expect(over({ a: 0, b: 0 })).toBe(false);
  });

  it('should work with `_.matchesProperty` shorthands', () => {
    const over = overSome([
      // @ts-expect-error - invalid argument
      ['b', 2],
      // @ts-expect-error - invalid argument
      ['a', 1],
    ]);

    expect(over({ a: 0, b: 2 })).toBe(true);
    expect(over({ a: 0, b: 0 })).toBe(false);
  });

  it('should differentiate between `_.property` and `_.matchesProperty` shorthands', () => {
    // @ts-expect-error - invalid argument
    let over = overSome(['a', 1]);

    expect(over({ a: 0, 1: 0 })).toBe(false);
    expect(over({ a: 1, 1: 0 })).toBe(true);
    expect(over({ a: 0, 1: 1 })).toBe(true);

    // @ts-expect-error - invalid argument
    over = overSome([['a', 1]]);

    expect(over({ a: 1 })).toBe(true);
    expect(over({ a: 2 })).toBe(false);
  });

  it('should flatten `predicates`', () => {
    const over = overSome(stubFalse, [stubTrue]);
    expect(over()).toBe(true);
  });

  it('should provide arguments to predicates', () => {
    let args;

    // @ts-expect-error - invalid argument
    const over = overSome(function () {
      // eslint-disable-next-line prefer-rest-params
      args = slice.call(arguments);
    });

    // @ts-expect-error - invalid argument
    over('a', 'b', 'c');
    expect(args).toEqual(['a', 'b', 'c']);
  });

  it('should use `this` binding of function for `predicates`', () => {
    const over = overSome(
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

    object.a = object.b = 0;
    expect(object.over()).toBe(false);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(overSome).toEqualTypeOf<typeof overSomeLodash>();
  });
});
