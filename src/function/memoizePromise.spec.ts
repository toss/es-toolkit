import { describe, expect, it, vi } from 'vitest';
import { memoizePromise } from './memoizePromise';

describe('memoizePromise', () => {
  it('shares the in-flight Promise and caches the resolved value', async () => {
    const fn = vi.fn(async (id: number) => ({ id }));
    const memoized = memoizePromise(fn);

    const first = memoized(1);
    const second = memoized(1);

    expect(second).toBe(first);
    expect(await first).toEqual({ id: 1 });
    expect(memoized.cache.get(1)).toEqual({ id: 1 });
    expect(memoized.cache.get(1)).not.toBeInstanceOf(Promise);

    expect(await memoized(1)).toEqual({ id: 1 });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not cache rejected Promises', async () => {
    const error = new Error('failed');
    const fn = vi.fn(async (key: string) => {
      void key;
      throw error;
    });
    const memoized = memoizePromise(fn);

    await expect(memoized('key')).rejects.toBe(error);
    expect(memoized.cache.has('key')).toBe(false);

    await expect(memoized('key')).rejects.toBe(error);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('uses a custom cache key resolver', async () => {
    const fn = vi.fn(async (user: { id: number; name: string }) => user.name);
    const memoized = memoizePromise(fn, { getCacheKey: user => user.id });

    await expect(memoized({ id: 1, name: 'Ada' })).resolves.toBe('Ada');
    await expect(memoized({ id: 1, name: 'Grace' })).resolves.toBe('Ada');

    expect(fn).toHaveBeenCalledTimes(1);
    expect(memoized.cache.get(1)).toBe('Ada');
  });

  it('uses a custom cache', async () => {
    const cache = new Map<number, string>();
    const fn = vi.fn(async (id: number) => `user-${id}`);
    const memoized = memoizePromise(fn, { cache });

    await expect(memoized(1)).resolves.toBe('user-1');

    expect(memoized.cache).toBe(cache);
    expect(cache.get(1)).toBe('user-1');
  });
});
