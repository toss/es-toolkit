import { describe, expect, it, vi } from 'vitest';
import { filterAsync } from './filterAsync';
import { delay } from '../promise/delay';

describe('filterAsync', () => {
  it('filters array asynchronously', async () => {
    const arr = [1, 2, 3, 4, 5];

    const predicate = vi.fn(async (n: number) => n % 2 === 0);
    const result = await filterAsync(arr, predicate);

    expect(result).toEqual([2, 4]);

    expect(predicate).toHaveBeenCalledTimes(arr.length);
    expect(predicate.mock.calls[0]).toEqual([1, 0, arr]);
    expect(predicate.mock.calls[1]).toEqual([2, 1, arr]);
    expect(predicate.mock.calls[2]).toEqual([3, 2, arr]);
  });

  it('returns empty array if given empty array', async () => {
    const arr: number[] = [];
    const predicate = vi.fn(async (n: number) => true);

    const result = await filterAsync(arr, predicate);
    expect(result).toEqual([]);

    expect(predicate).toHaveBeenCalledTimes(0);
  });

  it('returns empty array if all elements fail predicate', async () => {
    const arr = [1, 3, 5];
    const predicate = async (n: number) => n % 2 === 0;

    const result = await filterAsync(arr, predicate);
    expect(result).toEqual([]);
  });

  it('returns all elements if all pass predicate', async () => {
    const arr = [2, 4, 6];
    const predicate = async (n: number) => n % 2 === 0;

    const result = await filterAsync(arr, predicate);
    expect(result).toEqual([2, 4, 6]);
  });

  it('propagates rejection if any predicate throws', async () => {
    const arr = [1, 2, 3];
    const errorFn = async (item: number) => {
      if (item === 2) {
        throw new Error('fail');
      }
      return true;
    };
    await expect(filterAsync(arr, errorFn)).rejects.toThrow('fail');
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
      return item % 2 === 0;
    });

    const concurrency = 2;
    const result = await filterAsync(arr, fn, { concurrency });

    expect(result).toEqual([2, 4]);
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
      return item % 2 === 0;
    };

    await filterAsync(arr, fn);
    expect(maxRunning).toBe(10);
  });
});
