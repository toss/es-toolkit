import { describe, expect, it, expectTypeOf } from 'vitest';
import type { rest as restLodash } from 'lodash';
import { rest } from './rest';

describe('rest', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function fn(_a: unknown, _b: unknown, _c: unknown) {
    // eslint-disable-next-line prefer-rest-params
    return Array.from(arguments);
  }

  it('should apply a rest parameter to `func`', () => {
    const restFn = rest(fn);
    expect(restFn(1, 2, 3, 4)).toEqual([1, 2, [3, 4]]);
  });

  it('should work with `start`', () => {
    const restFn = rest(fn, 1);
    expect(restFn(1, 2, 3, 4)).toEqual([1, [2, 3, 4]]);
  });

  it('should treat `start` as `0` for `NaN` or negative values', () => {
    let restFn = rest(fn, -1);
    expect(restFn(1, 2, 3, 4)).toEqual([1, 2, [3, 4]]);
    restFn = rest(fn, NaN);
    expect(restFn(1, 2, 3, 4)).toEqual([1, 2, [3, 4]]);
    // @ts-expect-error - intentionally passing a string
    restFn = rest(fn, 'a');
    expect(restFn(1, 2, 3, 4)).toEqual([1, 2, [3, 4]]);
  });

  it('should coerce `start` to an integer', () => {
    const restFn = rest(fn, 1.6);
    expect(restFn(1, 2, 3)).toEqual([1, [2, 3]]);
  });

  it('should use an empty array when `start` is not reached', () => {
    const restFn = rest(fn);
    expect(restFn(1)).toEqual([1, undefined, []]);
  });

  it('should work on functions with more than three parameters', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const restFn = rest(function (_a: unknown, _b: unknown, _c: unknown, _d: unknown) {
      // eslint-disable-next-line prefer-rest-params
      return Array.from(arguments);
    });

    expect(restFn(1, 2, 3, 4, 5)).toEqual([1, 2, 3, [4, 5]]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(rest).toEqualTypeOf<typeof restLodash>();
  });
});
