import { describe, expect, it, vi } from 'vitest';
import { debounce } from './debounce';
import { delay } from '../../promise/delay';
import { identity } from '../_internal/identity';
import { noop } from '../../function/noop';

describe('debounce', () => {
  it('should debounce function calls', async () => {
    const func = vi.fn();
    const debounceMs = 50;
    const debouncedFunc = debounce(func, debounceMs);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    await delay(debounceMs * 2);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should delay the function call by the specified wait time', async () => {
    const func = vi.fn();
    const debounceMs = 50;
    const debouncedFunc = debounce(func, debounceMs);

    debouncedFunc();
    await delay(debounceMs / 2);
    expect(func).not.toHaveBeenCalled();

    await delay(debounceMs / 2 + 1);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should reset the wait time if called again before wait time ends', async () => {
    const func = vi.fn();
    const debounceMs = 50;
    const debouncedFunc = debounce(func, debounceMs);

    debouncedFunc();
    await delay(debounceMs / 2);
    debouncedFunc();
    await delay(debounceMs / 2);
    debouncedFunc();
    await delay(debounceMs / 2);
    debouncedFunc();

    expect(func).not.toHaveBeenCalled();

    await delay(debounceMs + 1);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should cancel the debounced function call', async () => {
    const func = vi.fn();
    const debounceMs = 50;
    const debouncedFunc = debounce(func, debounceMs);

    debouncedFunc();
    debouncedFunc.cancel();
    await delay(debounceMs);

    expect(func).not.toHaveBeenCalled();
  });

  it('should work correctly if the debounced function is called after the wait time', async () => {
    const func = vi.fn();
    const debounceMs = 50;
    const debouncedFunc = debounce(func, debounceMs);

    debouncedFunc();
    await delay(debounceMs + 1);
    debouncedFunc();
    await delay(debounceMs + 1);

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should have no effect if we call cancel when the function is not executed', async () => {
    const func = vi.fn();
    const debounceMs = 50;
    const debouncedFunc = debounce(func, debounceMs);

    expect(() => debouncedFunc.cancel()).not.toThrow();
  });

  it('should call the function with correct arguments', async () => {
    const func = vi.fn();
    const debounceMs = 50;
    const debouncedFunc = debounce(func, debounceMs);

    debouncedFunc('test', 123);

    await delay(debounceMs * 2);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('test', 123);
  });

  it('should cancel the debounced function call if aborted via AbortSignal', async () => {
    const func = vi.fn();
    const debounceMs = 50;
    const controller = new AbortController();
    const signal = controller.signal;
    const debouncedFunc = debounce(func, debounceMs, { signal });

    debouncedFunc();
    controller.abort();

    await delay(debounceMs);

    expect(func).not.toHaveBeenCalled();
  });

  it('should not call the debounced function if it is already aborted by AbortSignal', async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    controller.abort();

    const func = vi.fn();

    const debounceMs = 50;
    const debouncedFunc = debounce(func, debounceMs, { signal });

    debouncedFunc();

    await delay(debounceMs);

    expect(func).not.toHaveBeenCalled();
  });

  it('should not add multiple abort event listeners', async () => {
    const func = vi.fn();
    const debounceMs = 100;
    const controller = new AbortController();
    const signal = controller.signal;
    const addEventListenerSpy = vi.spyOn(signal, 'addEventListener');

    const debouncedFunc = debounce(func, debounceMs, { signal });

    debouncedFunc();
    debouncedFunc();

    await new Promise(resolve => setTimeout(resolve, 150));

    expect(func).toHaveBeenCalledTimes(1);

    const listenerCount = addEventListenerSpy.mock.calls.filter(([event]) => event === 'abort').length;
    expect(listenerCount).toBe(1);

    addEventListenerSpy.mockRestore();
  });

  it('should call the function immediately and only once if leading is true', async () => {
    const func = vi.fn();
    const debounceMs = 50;
    const debouncedFunc = debounce(func, debounceMs, { leading: true });

    debouncedFunc();
    expect(func).toHaveBeenCalledTimes(1);

    await delay(debounceMs * 2);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should call the function immediately and after the wait time if leading and trailing are true', async () => {
    const func = vi.fn();
    const debounceMs = 50;
    const debouncedFunc = debounce(func, debounceMs, {
      leading: true,
      trailing: true,
    });

    debouncedFunc();
    debouncedFunc();

    expect(func).toHaveBeenCalledTimes(1);

    await delay(debounceMs * 2);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should not call the function immediately if leading is false', async () => {
    const func = vi.fn();
    const debounceMs = 50;
    const debouncedFunc = debounce(func, debounceMs, { leading: false });

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    await delay(debounceMs * 2);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should not call the function after the wait time if trailing is false', async () => {
    const func = vi.fn();
    const debounceMs = 50;
    const debouncedFunc = debounce(func, debounceMs, { trailing: false });

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    await delay(debounceMs * 2);
    expect(func).not.toHaveBeenCalled();
  });

  /** @see https://github.com/lodash/lodash/blob/main/test/debounce.spec.js#L4 */
  it('should debounce a function', async () => {
    let callCount = 0;

    const debounced = debounce(value => {
      ++callCount;
      return value;
    }, 32);

    const results = [debounced('a'), debounced('b'), debounced('c')];
    expect(results).toEqual([undefined, undefined, undefined]);
    expect(callCount).toBe(0);

    await delay(128);

    expect(callCount).toBe(1);

    const results2 = [debounced('d'), debounced('e'), debounced('f')];
    expect(results2).toEqual(['c', 'c', 'c']);
    expect(callCount).toBe(1);

    await delay(128);

    expect(callCount).toBe(2);
  });

  it('subsequent debounced calls return the last `func` result', async done => {
    const debounced = debounce(identity, 32);
    debounced('a');

    await delay(64);

    expect(debounced('b')).not.toEqual('b');

    await delay(64);

    expect(debounced('c')).not.toEqual('c');
  });

  it('should not immediately call `func` when `wait` is `0`', async () => {
    let callCount = 0;
    const debounced = debounce(() => {
      ++callCount;
    }, 0);

    debounced();
    debounced();
    expect(callCount).toBe(0);

    await delay(5);

    expect(callCount).toBe(1);
  });

  it('should apply default options', async () => {
    let callCount = 0;
    const debounced = debounce(
      () => {
        callCount++;
      },
      32,
      {}
    );

    debounced();
    expect(callCount).toBe(0);

    await delay(64);

    expect(callCount).toBe(1);
  });

  it('should support a `leading` option', async () => {
    const callCounts = [0, 0];

    const withLeading = debounce(
      () => {
        callCounts[0]++;
      },
      32,
      { leading: true }
    );

    const withLeadingAndTrailing = debounce(
      () => {
        callCounts[1]++;
      },
      32,
      { leading: true }
    );

    withLeading();
    expect(callCounts[0]).toBe(1);

    withLeadingAndTrailing();
    withLeadingAndTrailing();
    expect(callCounts[1]).toBe(1);

    await delay(64);

    expect(callCounts).toEqual([1, 2]);

    withLeading();
    expect(callCounts[0]).toBe(2);
  });

  it('subsequent leading debounced calls return the last `func` result', async () => {
    const debounced = debounce(identity, 32, { leading: true, trailing: false });
    const results = [debounced('a'), debounced('b')];

    expect(results).toEqual(['a', 'a']);

    await delay(64);

    const results2 = [debounced('c'), debounced('d')];
    expect(results2).toEqual(['c', 'c']);
  });

  it('should support a `trailing` option', async () => {
    let withCount = 0;
    let withoutCount = 0;

    const withTrailing = debounce(
      () => {
        withCount++;
      },
      32,
      { trailing: true }
    );

    const withoutTrailing = debounce(
      () => {
        withoutCount++;
      },
      32,
      { trailing: false }
    );

    withTrailing();
    expect(withCount).toBe(0);

    withoutTrailing();
    expect(withoutCount).toBe(0);

    await delay(64);

    expect(withCount).toBe(1);
    expect(withoutCount).toBe(0);
  });

  it('should support a `maxWait` option', async () => {
    let callCount = 0;

    const debounced = debounce(
      (value?: unknown) => {
        ++callCount;
        return value;
      },
      32,
      { maxWait: 64 }
    );

    debounced();
    debounced();
    expect(callCount).toBe(0);

    await delay(128);

    expect(callCount).toBe(1);
    debounced();
    debounced();
    expect(callCount).toBe(1);

    await delay(128);

    expect(callCount).toBe(2);
  });

  it('should support `maxWait` in a tight loop', async done => {
    const limit = 1000;
    let withCount = 0;
    let withoutCount = 0;

    const withMaxWait = debounce(
      () => {
        withCount++;
      },
      64,
      { maxWait: 128 }
    );

    const withoutMaxWait = debounce(() => {
      withoutCount++;
    }, 96);

    const start = Date.now();
    while (Date.now() - start < limit) {
      withMaxWait();
      withoutMaxWait();
    }
    const actual = [Boolean(withoutCount), Boolean(withCount)];
    await delay(1);
    expect(actual).toEqual([false, true]);
  });

  it('should queue a trailing call for subsequent debounced calls after `maxWait`', async () => {
    let callCount = 0;

    const debounced = debounce(
      () => {
        ++callCount;
      },
      200,
      { maxWait: 200 }
    );

    debounced();

    setTimeout(debounced, 190);
    setTimeout(debounced, 200);
    setTimeout(debounced, 210);

    await delay(500);

    expect(callCount).toBe(2);
  });

  it('should cancel `maxDelayed` when `delayed` is invoked', async () => {
    let callCount = 0;

    const debounced = debounce(
      () => {
        callCount++;
      },
      32,
      { maxWait: 64 }
    );

    debounced();

    await delay(128);

    debounced();
    expect(callCount).toBe(1);

    await delay(64);
    expect(callCount).toBe(2);
  });

  it('should invoke the trailing call with the correct arguments and `this` binding', async () => {
    let actual: any;
    let callCount = 0;
    const object = {};

    const debounced = debounce(
      function (this: any, value: any) {
        actual = [this];
        Array.prototype.push.apply(actual, arguments as any);
        return ++callCount != 2;
      },
      32,
      { leading: true, maxWait: 64 }
    );

    while (true) {
      if (!debounced.call(object, 'a')) {
        break;
      }
    }

    await delay(64);

    expect(callCount).toBe(2);
    expect(actual).toEqual([object, 'a']);
  });

  /** @see https://github.com/lodash/lodash/blob/4.17.15/test/test.js#L22973 */
  const func = debounce;
  const isDebounce = true;
  const methodName = 'debounce';

  it(`\`_.${methodName}\` should not error for non-object \`options\` values`, () => {
    func(noop, 32, 1 as any);
    expect(true);
  });

  it(`\`_.${methodName}\` should use a default \`wait\` of \`0\``, async () => {
    let callCount = 0;
    const funced = func(() => {
      callCount++;
    });

    funced();

    await delay(32);

    funced();
    expect(callCount).toBe(isDebounce ? 1 : 2);
  });

  it(`\`_.${methodName}\` should invoke \`func\` with the correct \`this\` binding`, async done => {
    const actual: any[] = [];
    const object = {
      funced: func(function (this: any) {
        actual.push(this);
      }, 32),
    };
    const expected = [object];

    object.funced();

    await delay(64);
    expect(actual).toEqual(expected);
  });

  it(`\`_.${methodName}\` supports recursive calls`, async () => {
    const actual: any[] = [];
    const args = ['a', 'b', 'c'].map(chr => [{}, chr]);
    const expected = args.slice();
    const queue: any[] = args.slice();

    var funced = func(function (this: any, _: unknown) {
      const current = [this];
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

    await delay(256);

    expect(actual).toEqual(expected.slice(0, actual.length));
  });

  it(`\`_.${methodName}\` should support cancelling delayed calls`, async () => {
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

    await delay(64);

    expect(callCount).toBe(0);
  });

  it(`\`_.${methodName}\` should reset \`lastCalled\` after cancelling`, async () => {
    let callCount = 0;

    const funced = func(() => ++callCount, 32, { leading: true });

    expect(funced()).toBe(1);
    funced.cancel();

    expect(funced()).toBe(2);
    funced();

    await delay(64);
    expect(callCount).toBe(3);
  });

  it(`\`_.${methodName}\` should support flushing delayed calls`, async () => {
    let callCount = 0;

    const funced = func(() => ++callCount, 32, { leading: false });

    funced();
    expect(funced.flush()).toBe(1);

    await delay(64);

    expect(callCount).toBe(1);
  });

  it(`\`_.${methodName}\` should noop \`cancel\` and \`flush\` when nothing is queued`, async () => {
    let callCount = 0;
    const funced = func(() => {
      callCount++;
    }, 32);

    funced.cancel();
    expect(funced.flush()).toBe(undefined);

    await delay(64);
    expect(callCount).toBe(0);
  });
});
