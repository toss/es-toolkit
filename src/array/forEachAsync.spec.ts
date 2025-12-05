import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { forEachAsync } from './forEachAsync';
import { delay } from '../promise/delay';

describe('forEachAsync', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('executes callback for each element asynchronously', async () => {
    const arr = [1, 2, 3];
    const callback = vi.fn(async () => {
      await delay(10);
    });

    const promise = forEachAsync(arr, callback);
    await vi.advanceTimersByTimeAsync(10);
    await promise;

    expect(callback).toHaveBeenCalledTimes(arr.length);
    expect(callback.mock.calls[0]).toEqual([1, 0, arr]);
    expect(callback.mock.calls[1]).toEqual([2, 1, arr]);
    expect(callback.mock.calls[2]).toEqual([3, 2, arr]);
  });

  it('handles empty array', async () => {
    const arr: number[] = [];
    const callback = vi.fn(async () => {});

    await forEachAsync(arr, callback);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('propagates rejection if any callback throws', async () => {
    const arr = [1, 2, 3];
    const errorFn = async (item: number) => {
      if (item === 2) {
        throw new Error('fail');
      }
    };
    await expect(forEachAsync(arr, errorFn)).rejects.toThrow('fail');
  });

  it('respects concurrency limit', async () => {
    const arr = [1, 2, 3, 4, 5];

    let running = 0;
    let maxRunning = 0;

    const fn = vi.fn(async () => {
      running++;

      if (running > maxRunning) {
        maxRunning = running;
      }

      await delay(20);
      running--;
    });

    const concurrency = 2;
    const promise = forEachAsync(arr, fn, { concurrency });
    await vi.advanceTimersByTimeAsync(60);
    await promise;

    expect(maxRunning).toBeLessThanOrEqual(concurrency);
    expect(fn).toHaveBeenCalledTimes(arr.length);
  });

  it('uses full concurrency when not specified', async () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let running = 0;
    let maxRunning = 0;

    const fn = async () => {
      running++;
      if (running > maxRunning) {
        maxRunning = running;
      }
      await delay(20);
      running--;
    };

    const promise = forEachAsync(arr, fn);
    await vi.advanceTimersByTimeAsync(20);
    await promise;

    expect(maxRunning).toBe(10);
  });
});
