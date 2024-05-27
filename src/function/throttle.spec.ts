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
    const debounceMs = 50;
    const throttledFunc = throttle(func, debounceMs);

    throttledFunc();
    await delay(debounceMs / 2);
    throttledFunc();

    expect(func).toHaveBeenCalledTimes(1);

    await delay(debounceMs / 2 + 1);
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(2);
  });
});
