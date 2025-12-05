import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import type { delay as delayLodash } from 'lodash';
import { delay } from './delay';
import { slice } from '../_internal/slice';

describe('delay', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should delay `func` execution', () => {
    let pass = false;
    delay(() => {
      pass = true;
    }, 32);

    vi.advanceTimersByTime(1);
    expect(pass).toBe(false);

    vi.advanceTimersByTime(63);
    expect(pass).toBe(true);
  });

  it('should provide additional arguments to `func`', () => {
    let args;
    delay(
      function () {
        // eslint-disable-next-line prefer-rest-params
        args = slice.call(arguments);
      },
      32,
      1,
      2
    );

    vi.advanceTimersByTime(64);

    expect(args).toEqual([1, 2]);
  });

  it('should use a default `wait` of `0`', () => {
    let pass = false;
    // @ts-expect-error invalid type
    delay(() => {
      pass = true;
    });

    expect(pass).toBe(false);

    vi.advanceTimersByTime(0);

    expect(pass).toBe(true);
  });

  it('should be cancelable', () => {
    let pass = true;
    const timerId = delay(() => {
      pass = false;
    }, 32);

    clearTimeout(timerId);

    vi.advanceTimersByTime(64);

    expect(pass).toBe(true);
  });

  it('should work with mocked `setTimeout`', () => {
    vi.useRealTimers();

    let pass = false;
    const originalSetTimeout = globalThis.setTimeout;

    // @ts-expect-error invalid type
    global.setTimeout = (func: () => void) => {
      func();
    };

    delay(() => {
      pass = true;
    }, 32);

    expect(pass).toBe(true);

    global.setTimeout = originalSetTimeout;
  });

  it('should throw an error if `func` is not a function', () => {
    expect(() => {
      // @ts-expect-error invalid type
      delay('hello', 1000);
    }).toThrow('Expected a function');
  });

  it('should match the type of lodash', () => {
    expectTypeOf(delay).toEqualTypeOf<typeof delayLodash>();
  });
});
