import { describe, it, expect, vi } from 'vitest';
import { debounce } from './debounce'; // adjust the import path as necessary
import { delay } from '../promise';

describe('debounce', () => {
  it('should debounce function calls', async () => {
    const func = vi.fn();
    const waitMs = 50;
    const debouncedFunc = debounce(func, waitMs);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    await delay(waitMs * 2)

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should delay the function call by the specified wait time', async () => {
    const func = vi.fn();
    const waitMs = 50;
    const debouncedFunc = debounce(func, waitMs);

    debouncedFunc();
    await delay(waitMs / 2);
    expect(func).not.toHaveBeenCalled();

    await delay(waitMs / 2 + 1);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should reset the wait time if called again before wait time ends', async () => {
    const func = vi.fn();
    const waitMs = 50;
    const debouncedFunc = debounce(func, waitMs);

    debouncedFunc();
    await delay(waitMs / 2);
    debouncedFunc();
    await delay(waitMs / 2);
    debouncedFunc();
    await delay(waitMs / 2);
    debouncedFunc();

    expect(func).not.toHaveBeenCalled();

    await delay(waitMs + 1);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should cancel the debounced function call', async () => {
    const func = vi.fn();
    const waitMs = 50;
    const debouncedFunc = debounce(func, waitMs);

    debouncedFunc();
    debouncedFunc.cancel();
    await delay(waitMs);

    expect(func).not.toHaveBeenCalled();
  });

  it('should work correctly if the debounced function is called after the wait time', async () => {
    const func = vi.fn();
    const waitMs = 50;
    const debouncedFunc = debounce(func, waitMs);

    debouncedFunc();
    await delay(waitMs + 1);
    debouncedFunc();
    await delay(waitMs + 1);

    expect(func).toHaveBeenCalledTimes(2);
  });
});
