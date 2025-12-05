import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import type { defer as deferLodash } from 'lodash';
import { defer } from './defer';

describe('defer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should provide additional arguments to `func`', () => {
    let args: any[] = [];

    defer(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function (a: any, b: any) {
        // eslint-disable-next-line prefer-rest-params
        args = Array.from(arguments);
      },
      1,
      2
    );

    vi.advanceTimersByTime(32);

    expect(args).toEqual([1, 2]);
  });

  it('should be cancelable', () => {
    let pass = true;
    const timerId = defer(() => {
      pass = false;
    });

    clearTimeout(timerId);

    vi.advanceTimersByTime(32);

    expect(pass).toBe(true);
  });

  it('should throw an error if `func` is not a function', () => {
    expect(() => defer(1 as any)).toThrow();
  });

  it('should match the type of lodash', () => {
    expectTypeOf(defer).toEqualTypeOf<typeof deferLodash>();
  });
});
