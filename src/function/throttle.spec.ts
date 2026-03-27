import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { throttle } from './throttle';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should throttle function calls', () => {
    const func = vi.fn();
    const throttledFunc = throttle(func, 100);

    throttledFunc();
    throttledFunc();
    throttledFunc();

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should execute the function immediately if not called within the wait time', () => {
    const func = vi.fn();
    const throttleMs = 500;
    const throttledFunc = throttle(func, throttleMs);

    throttledFunc(); // should be executed
    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(throttleMs / 2);
    expect(func).toHaveBeenCalledTimes(1);

    throttledFunc(); // should be ignored
    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(throttleMs / 2 + 1);
    expect(func).toHaveBeenCalledTimes(1);

    throttledFunc(); // should be executed
    expect(func).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(throttleMs / 2 - 1);
    expect(func).toHaveBeenCalledTimes(2);

    throttledFunc(); // should be ignored
    expect(func).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(throttleMs / 2 + 1);
    expect(func).toHaveBeenCalledTimes(2);

    throttledFunc(); // should be executed
    expect(func).toHaveBeenCalledTimes(3);
  });

  it('should call the function with correct arguments', () => {
    const func = vi.fn();
    const throttleMs = 50;
    const throttledFunc = throttle(func, throttleMs);

    throttledFunc('test', 123);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('test', 123);
  });

  it('should not trigger a trailing call when invoked once', () => {
    const func = vi.fn();
    const throttleMs = 50;

    const throttled = throttle(func, throttleMs);

    throttled();
    expect(func).toBeCalledTimes(1);

    vi.advanceTimersByTime(throttleMs + 1);
    expect(func).toBeCalledTimes(1);
  });

  it('should trigger a trailing call as soon as possible', () => {
    const func = vi.fn();
    const throttleMs = 50;

    const throttled = throttle(func, throttleMs);

    throttled();
    throttled();
    expect(func).toBeCalledTimes(1);

    vi.advanceTimersByTime(throttleMs + 1);
    expect(func).toBeCalledTimes(2);
  });

  it('should be able to abort initial invocation', () => {
    const throttleMs = 50;
    const func = vi.fn();
    const controller = new AbortController();
    controller.abort();

    const throttled = throttle(func, throttleMs, { signal: controller.signal });

    throttled();
    throttled();
    expect(func).toBeCalledTimes(0);

    vi.advanceTimersByTime(throttleMs + 1);
    expect(func).toBeCalledTimes(0);
  });

  it('should be able to abort trailing edge invocation', () => {
    const throttleMs = 50;
    const func = vi.fn();
    const controller = new AbortController();

    const throttled = throttle(func, throttleMs, { signal: controller.signal });

    throttled();
    throttled();
    expect(func).toBeCalledTimes(1);

    controller.abort();

    vi.advanceTimersByTime(throttleMs + 1);
    expect(func).toBeCalledTimes(1);
  });

  it('should execute on leading and trailing when called multiple times with leading and trailing', () => {
    const callback = vi.fn();
    const throttleMs = 50;
    const throttled = throttle(callback, throttleMs, { edges: ['leading', 'trailing'] });

    throttled();

    vi.advanceTimersByTime(throttleMs + 1);

    expect(callback).toHaveBeenCalledTimes(1);

    throttled();

    vi.advanceTimersByTime(throttleMs + 1);

    expect(callback).toHaveBeenCalledTimes(2);

    throttled();
    throttled();

    expect(callback).toHaveBeenCalledTimes(3);

    vi.advanceTimersByTime(throttleMs + 1);

    expect(callback).toHaveBeenCalledTimes(4);
  });

  it('should preserve this context when called as a method', async () => {
    const throttleMs = 50;
    let capturedMsg: string | undefined;

    const obj = {
      msg: 'hello world',
      logWithThrottle: throttle(function (this: any) {
        capturedMsg = this?.msg;
      }, throttleMs),
    };

    obj.logWithThrottle();
    expect(capturedMsg).toBe('hello world');

    capturedMsg = undefined;
    obj.logWithThrottle();
    obj.logWithThrottle();

    vi.advanceTimersByTime(throttleMs + 1);
    expect(capturedMsg).toBe('hello world');
  });

  it('should invoke function periodically with trailing edge only', async () => {
    const callback = vi.fn();
    const throttleMs = 50;
    const throttled = throttle(callback, throttleMs, { edges: ['trailing'] });

    throttled();
    expect(callback).toHaveBeenCalledTimes(0);

    await delay(throttleMs + 1);
    expect(callback).toHaveBeenCalledTimes(1);

    throttled();
    expect(callback).toHaveBeenCalledTimes(1);

    await delay(throttleMs + 1);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should invoke function periodically during continuous calls with trailing edge only', async () => {
    const callback = vi.fn();
    const throttleMs = 50;
    const throttled = throttle(callback, throttleMs, { edges: ['trailing'] });

    const intervalId = setInterval(() => {
      throttled();
    }, 10);

    await delay(throttleMs * 3 + 10);
    clearInterval(intervalId);

    expect(callback.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  it('should invoke function periodically with leading edge only', async () => {
    const callback = vi.fn();
    const throttleMs = 50;
    const throttled = throttle(callback, throttleMs, { edges: ['leading'] });

    throttled();
    expect(callback).toHaveBeenCalledTimes(1);

    await delay(throttleMs / 2);
    throttled();
    expect(callback).toHaveBeenCalledTimes(1);

    await delay(throttleMs / 2 + 1);
    throttled();
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
