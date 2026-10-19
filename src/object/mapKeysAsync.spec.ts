import { describe, expect, it, vi } from 'vitest';
import { mapKeysAsync } from './mapKeysAsync.ts';
import { delay } from '../promise/delay.ts';

describe('mapKeysAsync', () => {
  it('should iterate over and map the object using its own string keys asynchronously', async () => {
    const result = await mapKeysAsync({ a: 1, b: 2, c: 3 }, async (_, key) => `${key}a`);
    expect(result).toEqual({ aa: 1, ba: 2, ca: 3 });
  });

  it('should iterate over and map the object using its own number keys asynchronously', async () => {
    const result = await mapKeysAsync({ 1: 'a', 2: 'b', 3: 'c' }, async (_, key) => key * 2);
    expect(result).toEqual({ 2: 'a', 4: 'b', 6: 'c' });
  });

  it('should pass the value corresponding to the current key into the iteratee', async () => {
    const result = await mapKeysAsync({ a: 1, b: 2, c: 3 }, async value => value);
    expect(result).toEqual({ 1: 1, 2: 2, 3: 3 });
  });

  it('should propagate rejection if any iteratee throws', async () => {
    const errorFn = async (value: number, key: string) => {
      if (value === 2) {
        throw new Error('fail');
      }
      return key;
    };
    await expect(mapKeysAsync({ a: 1, b: 2, c: 3 }, errorFn)).rejects.toThrow('fail');
  });

  it('should respect concurrency limit', async () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };

    let running = 0;
    let maxRunning = 0;

    const fn = vi.fn(async (value: number, key: string) => {
      running++;

      if (running > maxRunning) {
        maxRunning = running;
      }

      await delay(20);
      running--;
      return key + value;
    });

    const concurrency = 2;
    const result = await mapKeysAsync(obj, fn, { concurrency });

    expect(result).toEqual({ a1: 1, b2: 2, c3: 3, d4: 4, e5: 5 });
    expect(maxRunning).toBeLessThanOrEqual(concurrency);
    expect(fn).toHaveBeenCalledTimes(Object.keys(obj).length);
  });

  it('should use full concurrency when not specified', async () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 };

    let running = 0;
    let maxRunning = 0;

    const fn = async (value: number, key: string) => {
      running++;
      if (running > maxRunning) {
        maxRunning = running;
      }
      await delay(20);
      running--;
      return key + value;
    };

    await mapKeysAsync(obj, fn);
    expect(maxRunning).toBe(10);
  });
});
