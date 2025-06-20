import { describe, expect, expectTypeOf, it } from 'vitest';
import type { unary as unaryLodash } from 'lodash';
import { unary } from './unary';
import { map } from '../array/map';

describe('unary', () => {
  function fn(...args: any[]) {
    return args;
  }

  it('should cap the number of arguments provided to `func`', () => {
    const actual = map(['6', '8', '10'], unary(parseInt));
    expect(actual).toEqual([6, 8, 10]);
  });

  it('should not force a minimum argument count', () => {
    const capped = unary(fn);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(capped()).toEqual([]);
  });

  it('should use `this` binding of function', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const capped = unary(function (this: any, _a: unknown, _b: unknown) {
      return this;
    });
    const object = { capped: capped };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(object.capped()).toBe(object);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(unary).toEqualTypeOf<typeof unaryLodash>();
  });
});
