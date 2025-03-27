import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Mutex } from './mutex';

describe('Mutex', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should allow acquisition when the mutex is available', async () => {
    const mutex = new Mutex();

    await expect(mutex.acquire()).resolves.toBeUndefined();
  });

  it('should not allow acquisition when the mutex is already acquired', async () => {
    const mutex = new Mutex();

    await mutex.acquire();

    const spy = vi.fn();

    mutex.acquire().then(spy);

    await vi.advanceTimersByTimeAsync(0);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should allow acquisition after the mutex is released before the call', async () => {
    const mutex = new Mutex();

    await mutex.acquire();
    mutex.release();

    await expect(mutex.acquire()).resolves.toBeUndefined();
  });

  it('should allow acquisition after the mutex is released after the call', async () => {
    const mutex = new Mutex();

    await mutex.acquire();

    const spy = vi.fn();

    mutex.acquire().then(spy);

    mutex.release();

    await vi.advanceTimersByTimeAsync(100);

    expect(spy).toBeCalledTimes(1);
  });

  it('should correctly report the locked state', async () => {
    const mutex = new Mutex();

    expect(mutex.isLocked).toBe(false);

    await mutex.acquire();

    expect(mutex.isLocked).toBe(true);

    mutex.release();

    expect(mutex.isLocked).toBe(false);
  });
});
