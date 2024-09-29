import { describe, it, expect, vi } from 'vitest';
import { debounce } from './debounce'; // adjust the import path as necessary
import { delay } from '../promise';

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

  it('should have no effect if we call cancel when the function is not executed', () => {
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
});
