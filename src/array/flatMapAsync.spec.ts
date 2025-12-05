import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { flatMapAsync } from './flatMapAsync';
import { delay } from '../promise/delay';

describe('flatMapAsync', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('maps and flattens array asynchronously', async () => {
    const arr = [1, 2, 3];

    const callback = vi.fn(async (n: number) => [n, n * 2]);
    const result = await flatMapAsync(arr, callback);

    expect(result).toEqual([1, 2, 2, 4, 3, 6]);

    expect(callback).toHaveBeenCalledTimes(arr.length);
    expect(callback.mock.calls[0]).toEqual([1, 0, arr]);
    expect(callback.mock.calls[1]).toEqual([2, 1, arr]);
    expect(callback.mock.calls[2]).toEqual([3, 2, arr]);
  });

  it('handles callbacks that return empty arrays', async () => {
    const arr = [1, 2, 3];
    const callback = vi.fn(async (n: number) => (n % 2 === 0 ? [n] : []));

    const result = await flatMapAsync(arr, callback);
    expect(result).toEqual([2]);
  });

  it('returns empty array if given empty array', async () => {
    const arr: number[] = [];
    const callback = vi.fn(async (n: number) => [n * 2]);

    const result = await flatMapAsync(arr, callback);
    expect(result).toEqual([]);

    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('handles callbacks returning arrays of different lengths', async () => {
    const arr = [1, 2, 3];
    const callback = async (n: number) => {
      if (n === 1) {
        return [n];
      }
      if (n === 2) {
        return [n, n, n];
      }
      return [];
    };

    const result = await flatMapAsync(arr, callback);
    expect(result).toEqual([1, 2, 2, 2]);
  });

  it('flattens only one level deep', async () => {
    const arr = [1, 2];
    const callback = async (n: number) => [[n, n * 2]];

    const result = await flatMapAsync(arr, callback);
    expect(result).toEqual([
      [1, 2],
      [2, 4],
    ]);
  });

  it('propagates rejection if any callback throws', async () => {
    const arr = [1, 2, 3];
    const errorFn = async (item: number) => {
      if (item === 2) {
        throw new Error('fail');
      }
      return [item];
    };
    await expect(flatMapAsync(arr, errorFn)).rejects.toThrow('fail');
  });

  it('respects concurrency limit', async () => {
    const arr = [1, 2, 3, 4, 5];

    let running = 0;
    let maxRunning = 0;

    const fn = vi.fn(async (item: number) => {
      running++;

      if (running > maxRunning) {
        maxRunning = running;
      }

      await delay(20);
      running--;
      return [item, item * 2];
    });

    const concurrency = 2;
    const promise = flatMapAsync(arr, fn, { concurrency });
    await vi.advanceTimersByTimeAsync(60);
    const result = await promise;

    expect(result).toEqual([1, 2, 2, 4, 3, 6, 4, 8, 5, 10]);
    expect(maxRunning).toBeLessThanOrEqual(concurrency);
    expect(fn).toHaveBeenCalledTimes(arr.length);
  });

  it('uses full concurrency when not specified', async () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let running = 0;
    let maxRunning = 0;

    const fn = async (item: number) => {
      running++;
      if (running > maxRunning) {
        maxRunning = running;
      }
      await delay(20);
      running--;
      return [item];
    };

    const promise = flatMapAsync(arr, fn);
    await vi.advanceTimersByTimeAsync(20);
    await promise;

    expect(maxRunning).toBe(10);
  });
});
