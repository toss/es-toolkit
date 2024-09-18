import { describe, it, expect, vi } from 'vitest';
import { throttle } from './throttle';
import { delay } from '../promise';

describe('throttle', () => {
  it('should throttle function calls', async () => {
    const func = vi.fn();
    const throttledFunc = throttle(func, 100);

    throttledFunc();
    throttledFunc();
    throttledFunc();

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should execute the function immediately if not called within the wait time', async () => {
    const func = vi.fn();
    const throttleMs = 500;
    const throttledFunc = throttle(func, throttleMs);

    throttledFunc();
    await delay(throttleMs / 2);

    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    await delay(throttleMs / 2 + 1);

    expect(func).toHaveBeenCalledTimes(1);

    throttledFunc();

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should call the function with correct arguments', async () => {
    const func = vi.fn();
    const throttleMs = 50;
    const throttledFunc = throttle(func, throttleMs);

    throttledFunc('test', 123);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('test', 123);
  });

  it('should not trigger a trailing call when invoked once', async () => {
    const func = vi.fn();
    const throttleMs = 50;

    const throttled = throttle(func, throttleMs);

    throttled();
    expect(func).toBeCalledTimes(1);

    await delay(throttleMs + 1);
    expect(func).toBeCalledTimes(1);
  });

  it('should trigger a trailing call as soon as possible', async () => {
    const func = vi.fn();
    const throttleMs = 50;

    const throttled = throttle(func, throttleMs);

    throttled();
    throttled();
    expect(func).toBeCalledTimes(1);

    await delay(throttleMs + 1);
    expect(func).toBeCalledTimes(2);
  });

  it('should be able to abort initial invocation', async () => {
    const throttleMs = 50;
    const func = vi.fn();
    const controller = new AbortController();
    controller.abort();

    const throttled = throttle(func, throttleMs, { signal: controller.signal });

    throttled();
    throttled();
    expect(func).toBeCalledTimes(0);

    await delay(throttleMs + 1);
    expect(func).toBeCalledTimes(0);
  });

  it('should be able to abort trailing edge invocation', async () => {
    const throttleMs = 50;
    const func = vi.fn();
    const controller = new AbortController();

    const throttled = throttle(func, throttleMs, { signal: controller.signal });

    throttled();
    throttled();
    expect(func).toBeCalledTimes(1);

    controller.abort();

    await delay(throttleMs + 1);
    expect(func).toBeCalledTimes(1);
  });
});
