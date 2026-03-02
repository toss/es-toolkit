import { describe, expect, it, vi } from 'vitest';
import { limitAsync } from './limitAsync';
import { delay } from '../promise/delay';

describe('limitAsync', () => {
  it('limits concurrency of async callbacks', async () => {
    let running = 0;
    let maxRunning = 0;

    const callback = vi.fn(async () => {
      running++;

      if (running > maxRunning) {
        maxRunning = running;
      }
      await delay(30);

      running--;
    });

    const limitedCallback = limitAsync(callback, 2);

    await Promise.all([limitedCallback(), limitedCallback(), limitedCallback(), limitedCallback(), limitedCallback()]);

    expect(maxRunning).toBeLessThanOrEqual(2);
    expect(callback).toHaveBeenCalledTimes(5);
  });

  it('returns correct values in correct order', async () => {
    const callback = vi.fn(async (item: number) => item);

    const limitedCallback = limitAsync(callback, 3);

    const results = await Promise.all([limitedCallback(3), limitedCallback(1), limitedCallback(4), limitedCallback(2)]);

    expect(results).toEqual([3, 1, 4, 2]);

    expect(callback).toBeCalledTimes(4);
    expect(callback.mock.calls[0][0]).toBe(3);
    expect(callback.mock.calls[1][0]).toBe(1);
    expect(callback.mock.calls[2][0]).toBe(4);
    expect(callback.mock.calls[3][0]).toBe(2);
  });

  it('propagates callback errors', async () => {
    const callback = vi.fn(async (item: number) => {
      if (item === 2) {
        throw new Error('fail');
      }
      return item;
    });

    const limitedCallback = limitAsync(callback, 2);

    await expect(Promise.all([limitedCallback(1), limitedCallback(2), limitedCallback(3)])).rejects.toThrow('fail');
  });
});
