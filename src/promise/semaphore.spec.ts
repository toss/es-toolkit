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

  it('should resolve a long queue of waiters in the order they were made', async () => {
    const semaphore = new Semaphore(1);
    const waiterCount = 30_000;

    await semaphore.acquire();

    const order: number[] = [];
    const waiters: Array<Promise<void>> = [];

    for (let i = 0; i < waiterCount; i++) {
      waiters.push(
        semaphore.acquire().then(() => {
          order.push(i);
          semaphore.release();
        })
      );
    }

    semaphore.release();

    await Promise.all(waiters);

    expect(order).toEqual(Array.from({ length: waiterCount }, (_, i) => i));
    expect(semaphore.available).toBe(1);
  });

  it('should keep FIFO order after the queue empties and fills again', async () => {
    const semaphore = new Semaphore(1);

    await semaphore.acquire();

    const spy1 = vi.fn();
    const spy2 = vi.fn();
    const spy3 = vi.fn();
    const spy4 = vi.fn();

    semaphore.acquire().then(spy1);
    semaphore.release();

    await delay(0);

    expect(spy1).toHaveBeenCalledTimes(1);

    semaphore.acquire().then(spy2);
    semaphore.acquire().then(spy3);
    semaphore.release();

    await delay(0);

    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).not.toHaveBeenCalled();

    semaphore.acquire().then(spy4);
    semaphore.release();

    await delay(0);

    expect(spy3).toHaveBeenCalledTimes(1);
    expect(spy4).not.toHaveBeenCalled();

    semaphore.release();

    await delay(0);

    expect(spy4).toHaveBeenCalledTimes(1);

    semaphore.release();

    expect(semaphore.available).toBe(1);
  });

  it('should not increase available permits beyond capacity when releasing without pending tasks', () => {
    const semaphore = new Semaphore(2);

    expect(semaphore.available).toBe(2);

    semaphore.release();
    expect(semaphore.available).toBe(2);

    semaphore.release();
    expect(semaphore.available).toBe(2);
  });
});
