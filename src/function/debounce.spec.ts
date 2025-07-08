import { describe, expect, it, vi } from 'vitest';
import { debounce } from './debounce';
// adjust the import path as necessary
import { delay } from '../promise';

const DEBOUNCE_MS = 50;

describe('debounce', () => {
  it('should debounce function calls', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DEBOUNCE_MS);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    expect(func).not.toHaveBeenCalled();

    await delay(DEBOUNCE_MS * 2);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should delay the function call by the specified wait time', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DEBOUNCE_MS);

    debouncedFunc();
    await delay(DEBOUNCE_MS / 2);
    expect(func).not.toHaveBeenCalled();

    await delay(DEBOUNCE_MS / 2 + 1);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should reset the wait time if called again before wait time ends', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DEBOUNCE_MS);

    debouncedFunc();
    await delay(DEBOUNCE_MS / 2);
    debouncedFunc();
    await delay(DEBOUNCE_MS / 2);
    debouncedFunc();
    await delay(DEBOUNCE_MS / 2);
    debouncedFunc();

    expect(func).not.toHaveBeenCalled();

    await delay(DEBOUNCE_MS + 1);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should cancel the debounced function call', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DEBOUNCE_MS);

    debouncedFunc();
    debouncedFunc.cancel();
    await delay(DEBOUNCE_MS);

    expect(func).not.toHaveBeenCalled();
  });

  it('should immediately invoke the delayed function when flush is called', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DEBOUNCE_MS);

    debouncedFunc();
    debouncedFunc.flush();

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should work correctly if the debounced function is called after the wait time', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DEBOUNCE_MS);

    debouncedFunc();
    await delay(DEBOUNCE_MS + 1);
    debouncedFunc();
    await delay(DEBOUNCE_MS + 1);

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should have no effect if we call cancel when the function is not executed', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DEBOUNCE_MS);

    expect(() => debouncedFunc.cancel()).not.toThrow();
  });

  it('should call the function with correct arguments', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DEBOUNCE_MS);

    debouncedFunc('test', 123);

    await delay(DEBOUNCE_MS * 2);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('test', 123);
  });

  it('should cancel the debounced function call if aborted via AbortSignal', async () => {
    const func = vi.fn();
    const controller = new AbortController();
    const signal = controller.signal;
    const debouncedFunc = debounce(func, DEBOUNCE_MS, { signal });

    debouncedFunc();
    controller.abort();

    await delay(DEBOUNCE_MS);

    expect(func).not.toHaveBeenCalled();
  });

  it('should not call the debounced function if it is already aborted by AbortSignal', async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    controller.abort();

    const func = vi.fn();

    const debouncedFunc = debounce(func, DEBOUNCE_MS, { signal });

    debouncedFunc();

    await delay(DEBOUNCE_MS);

    expect(func).not.toHaveBeenCalled();
  });

  it('should not add multiple abort event listeners', async () => {
    const func = vi.fn();
    const controller = new AbortController();
    const signal = controller.signal;
    const addEventListenerSpy = vi.spyOn(signal, 'addEventListener');

    const debouncedFunc = debounce(func, DEBOUNCE_MS, { signal });

    debouncedFunc();
    debouncedFunc();

    await new Promise(resolve => setTimeout(resolve, 150));

    expect(func).toHaveBeenCalledTimes(1);

    const listenerCount = addEventListenerSpy.mock.calls.filter(([event]) => event === 'abort').length;
    expect(listenerCount).toBe(1);

    addEventListenerSpy.mockRestore();
  });
});
