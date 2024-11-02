import { describe, expect, it } from 'vitest';
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
});
