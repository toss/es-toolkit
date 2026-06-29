import { describe, expect, it, vi } from 'vitest';
import { mapValuesAsync } from './mapValuesAsync.ts';
import { delay } from '../promise/delay.ts';

describe('mapValuesAsync', () => {
  it('should iterate over and map the object using its own values asynchronously', async () => {
    const result = await mapValuesAsync({ a: 1, b: 2, c: 3 }, async (n: number) => n * 2);
    expect(result).toEqual({ a: 2, b: 4, c: 6 });
  });

  it('should pass the key corresponding to the current value into the iteratee', async () => {
    const result = await mapValuesAsync({ a: 1, b: 2, c: 3 }, async (_, key) => key);
    expect(result).toEqual({ a: 'a', b: 'b', c: 'c' });
  });

  it('should pass the cloned object into the iteratee', async () => {
    const result = await mapValuesAsync({ a: 1, b: 2, c: 3 }, async (value, key, object) => {
      object[key] = value * 11;
      return value * 11;
    });

    expect(result).toEqual({ a: 11, b: 22, c: 33 });
  });

  it('should propagate rejection if any iteratee throws', async () => {
    const errorFn = async (value: number) => {
      if (value === 2) {
        throw new Error('fail');
      }
      return value;
    };
    await expect(mapValuesAsync({ a: 1, b: 2, c: 3 }, errorFn)).rejects.toThrow('fail');
  });

  it('should respect concurrency limit', async () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };

    let running = 0;
    let maxRunning = 0;

    const fn = vi.fn(async (value: number) => {
      running++;

      if (running > maxRunning) {
        maxRunning = running;
      }

      await delay(20);
      running--;
      return value * 2;
    });

    const concurrency = 2;
    const result = await mapValuesAsync(obj, fn, { concurrency });

    expect(result).toEqual({ a: 2, b: 4, c: 6, d: 8, e: 10 });
    expect(maxRunning).toBeLessThanOrEqual(concurrency);
    expect(fn).toHaveBeenCalledTimes(Object.keys(obj).length);
  });

  it('should use full concurrency when not specified', async () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 };

    let running = 0;
    let maxRunning = 0;

    const fn = async (value: number) => {
      running++;
      if (running > maxRunning) {
        maxRunning = running;
      }
      await delay(20);
      running--;
      return value * 2;
    };

    await mapValuesAsync(obj, fn);
    expect(maxRunning).toBe(10);
  });
});
