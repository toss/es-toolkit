import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import type { throttle as throttleLodash } from 'lodash';
import { throttle } from './throttle';
import { identity } from '../../function/identity';
import { noop } from '../../function/noop';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should throttle a function', () => {
    let callCount = 0;
    const throttled = throttle(() => {
      callCount++;
    }, 32);

    throttled();
    throttled();
    throttled();

    const lastCount = callCount;
    expect(callCount).toBeGreaterThan(0);

    vi.advanceTimersByTime(64);

    expect(callCount > lastCount).toBe(true);
  });

  it('subsequent calls should return the result of the first call', () => {
    const throttled = throttle(identity, 32);
    const results = [throttled('a'), throttled('b')];

    expect(results).toEqual(['a', 'a']);

    vi.advanceTimersByTime(64);

    const results2 = [throttled('c'), throttled('d')];
    expect(results2[0]).not.toStrictEqual('a');
    expect(results2[0]).not.toStrictEqual(undefined);

    expect(results2[0]).not.toStrictEqual('d');
    expect(results2[0]).not.toStrictEqual(undefined);
  });

  it('should clear timeout when `func` is called', () => {
    let callCount = 0;

    const throttled = throttle(() => {
      callCount++;
    }, 32);

    throttled();
    throttled();

    vi.advanceTimersByTime(64);

    expect(callCount).toBe(2);
  });

  it('should not trigger a trailing call when invoked once', () => {
    let callCount = 0;
    const throttled = throttle(() => {
      callCount++;
    }, 32);

    throttled();
    expect(callCount).toBe(1);

    vi.advanceTimersByTime(64);
    expect(callCount).toBe(1);
  });

  [0, 1].forEach(index => {
    it(`should trigger a call when invoked repeatedly${index ? ' and `leading` is `false`' : ''}`, () => {
      let callCount = 0;
      const limit = 1000;
      const options = index ? { leading: false } : {};
      const throttled = throttle(
        () => {
          callCount++;
        },
        32,
        options
      );

      const start = Date.now();
      for (let elapsed = 0; elapsed < limit; elapsed++) {
        vi.setSystemTime(start + elapsed);
        throttled();
      }
      const actual = callCount > 1;

      expect(actual).toBe(true);
    });

    it('should trigger a second throttled call as soon as possible', () => {
      let callCount = 0;

      const throttled = throttle(
        () => {
          callCount++;
        },
        128,
        { leading: false }
      );

      throttled();

      vi.advanceTimersByTime(192);

      expect(callCount).toBe(1);
      throttled();

      vi.advanceTimersByTime(254 - 192);

      expect(callCount).toBe(1);

      vi.advanceTimersByTime(384 - 254);

      expect(callCount).toBe(2);
    });

    it('should apply default options', () => {
      let callCount = 0;
      const throttled = throttle(
        () => {
          callCount++;
        },
        32,
        {}
      );

      throttled();
      throttled();
      expect(callCount).toBe(1);

      vi.advanceTimersByTime(128);

      expect(callCount).toBe(2);
    });

    it('should support a `leading` option', () => {
      const withLeading = throttle(identity, 32, { leading: true });
      expect(withLeading('a')).toBe('a');

      const withoutLeading = throttle(identity, 32, { leading: false });
      expect(withoutLeading('a')).toBe(undefined);
    });

    it('should support a `trailing` option', () => {
      let withCount = 0;
      let withoutCount = 0;

      const withTrailing = throttle(
        value => {
          withCount++;
          return value;
        },
        64,
        { trailing: true }
      );

      const withoutTrailing = throttle(
        value => {
          withoutCount++;
          return value;
        },
        64,
        { trailing: false }
      );

      expect(withTrailing('a')).toBe('a');
      expect(withTrailing('b')).toBe('a');

      expect(withoutTrailing('a')).toBe('a');
      expect(withoutTrailing('b')).toBe('a');

      vi.advanceTimersByTime(256);

      expect(withCount).toBe(2);
      expect(withoutCount).toBe(1);
    });

    it('should not update `lastCalled`, at the end of the timeout, when `trailing` is `false`', () => {
      let callCount = 0;

      const throttled = throttle(
        () => {
          callCount++;
        },
        64,
        { trailing: false }
      );

      throttled();
      throttled();

      vi.advanceTimersByTime(96);

      throttled();
      throttled();

      vi.advanceTimersByTime(192 - 96);

      expect(callCount).toBeGreaterThan(1);
    });
  });

  /** @see https://github.com/lodash/lodash/blob/4.17.15/test/test.js#L22973 */
  const func = throttle;
  const isDebounce = false;
  const methodName = 'throttle';

  it(`\`_.${methodName}\` should not error for non-object \`options\` values`, () => {
    expect(() => func(noop, 32, 1 as any)).not.toThrow();
  });

  it(`\`_.${methodName}\` should use a default \`wait\` of \`0\``, () => {
    let callCount = 0;
    const funced = func(() => {
      callCount++;
    });

    funced();

    vi.advanceTimersByTime(32);

    funced();
    expect(callCount).toBe(isDebounce ? 1 : 2);
  });

  it(`\`_.${methodName}\` should invoke \`func\` with the correct \`this\` binding`, () => {
    const actual: any[] = [];
    const object = {
      funced: func(function (this: any) {
        actual.push(this);
      }, 32),
    };
    const expected = [object];

    object.funced();

    vi.advanceTimersByTime(64);
    expect(actual).toEqual(expected);
  });

  it(`\`_.${methodName}\` supports recursive calls`, () => {
    const actual: any[] = [];
    const args = ['a', 'b', 'c'].map(chr => [{}, chr]);
    const expected = args.slice();
    const queue: any[] = args.slice();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const funced = func(function (this: any, _: unknown) {
      const current = [this];
      // eslint-disable-next-line prefer-rest-params
      Array.prototype.push.apply(current, arguments as any);
      actual.push(current);

      const next = queue.shift();
      if (next) {
        funced.call(next[0], next[1]);
      }
    }, 32);

    const next = queue.shift();
    funced.call(next[0], next[1]);
    expect(actual).toEqual(expected.slice(0, isDebounce ? 0 : 1));

    vi.advanceTimersByTime(256);

    expect(actual).toEqual(expected.slice(0, actual.length));
  });

  it(`\`_.${methodName}\` should support cancelling delayed calls`, () => {
    let callCount = 0;

    const funced = func(
      () => {
        callCount++;
      },
      32,
      { leading: false }
    );

    funced();
    funced.cancel();

    vi.advanceTimersByTime(64);

    expect(callCount).toBe(0);
  });

  it(`\`_.${methodName}\` should reset \`lastCalled\` after cancelling`, () => {
    let callCount = 0;

    const funced = func(() => ++callCount, 32, { leading: true });

    expect(funced()).toBe(1);
    funced.cancel();

    expect(funced()).toBe(2);
    funced();

    vi.advanceTimersByTime(64);
    expect(callCount).toBe(3);
  });

  it(`\`_.${methodName}\` should support flushing delayed calls`, () => {
    let callCount = 0;

    const funced = func(() => ++callCount, 32, { leading: false });

    funced();
    expect(funced.flush()).toBe(1);

    vi.advanceTimersByTime(64);

    expect(callCount).toBe(1);
  });

  it(`\`_.${methodName}\` should noop \`cancel\` and \`flush\` when nothing is queued`, () => {
    let callCount = 0;
    const funced = func(() => {
      callCount++;
    }, 32);

    funced.cancel();
    expect(funced.flush()).toBe(undefined);

    vi.advanceTimersByTime(64);
    expect(callCount).toBe(0);
  });

  it('should invoke the function immediately if wait is 0', () => {
    const fn = vi.fn();

    const throttled = throttle(fn, 0, { leading: true, trailing: true });

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    throttled();
    expect(fn).toHaveBeenCalledTimes(2);

    throttled();
    expect(fn).toHaveBeenCalledTimes(3);

    throttled();
    expect(fn).toHaveBeenCalledTimes(4);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(throttle).toEqualTypeOf<typeof throttleLodash>();
  });

  it('should not invoke the function even after flush is called if timer is going', () => {
    let callCount = 0;
    const throttled = throttle(() => ++callCount, 32);

    throttled();
    throttled.flush();
    throttled();

    expect(callCount).toBe(1);

    vi.advanceTimersByTime(64);
    expect(callCount).toBe(2);
  });
});
