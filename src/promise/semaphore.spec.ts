import { describe, expect, it, vi } from 'vitest';
import { delay } from './delay';
import { Semaphore } from './semaphore';

describe('Semaphore', () => {
  it('should allow acquisition when a permit is available', async () => {
    const sema = new Semaphore(1);

    await expect(sema.acquire()).resolves.toBeUndefined();
  });

  it('should not allow acquisition when no permits are available', async () => {
    const sema = new Semaphore(1);

    await sema.acquire();

    const spy = vi.fn();

    sema.acquire().then(spy);

    await delay(0);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should allow acquisition after a permit is released before the call', async () => {
    const sema = new Semaphore(1);

    await sema.acquire();
    sema.release();

    await expect(sema.acquire()).resolves.toBeUndefined();
  });

  it('should allow acquisition after a permit is released after the call', async () => {
    const sema = new Semaphore(1);

    await sema.acquire();

    const spy = vi.fn();

    sema.acquire().then(spy);

    sema.release();

    await delay(100);

    expect(spy).toBeCalledTimes(1);
  });

  it('should resolve requests in the order they were made when permits are released', async () => {
    const semaphore = new Semaphore(2);

    await semaphore.acquire();
    await semaphore.acquire();

    const spy1 = vi.fn();
    const spy2 = vi.fn();

    semaphore.acquire().then(spy1);
    semaphore.acquire().then(spy2);

    await delay(0);

    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();

    semaphore.release();

    await delay(0);

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).not.toHaveBeenCalled();

    await delay(0);

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).not.toHaveBeenCalledTimes(1);
  });

  it('should not allow acquiring more permits than the capacity', async () => {
    const semaphore = new Semaphore(1);

    semaphore.acquire();
    semaphore.acquire();

    semaphore.release();
    semaphore.release();

    const spy1 = vi.fn();
    const spy2 = vi.fn();

    semaphore.acquire().then(spy1);
    semaphore.acquire().then(spy2);

    await delay(0);

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).not.toHaveBeenCalled();
  });
});
