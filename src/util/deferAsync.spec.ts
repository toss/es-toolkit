import { describe, expect, it, vi } from 'vitest';
import { deferAsync } from './deferAsync';
import { delay } from '../promise';

// Prettier (3.2.5) cannot parse `await using` declarations yet, so these tests
// invoke `[Symbol.asyncDispose]()` directly, exactly as the `await using`
// machinery does.
describe('deferAsync', () => {
  it('should not run the callback until disposed', () => {
    const callback = vi.fn();

    deferAsync(callback);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should await the callback when disposed', async () => {
    const order: string[] = [];

    const disposable = deferAsync(async () => {
      await delay(10);
      order.push('cleanup');
    });

    await disposable[Symbol.asyncDispose]();

    expect(order).toEqual(['cleanup']);
  });

  it('should accept a synchronous callback', async () => {
    const callback = vi.fn();

    const disposable = deferAsync(callback);
    await disposable[Symbol.asyncDispose]();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should return a promise from dispose', () => {
    const disposable = deferAsync(() => {});

    expect(disposable[Symbol.asyncDispose]()).toBeInstanceOf(Promise);
  });

  it('should propagate errors thrown by the callback', async () => {
    const disposable = deferAsync(async () => {
      throw new Error('boom');
    });

    await expect(disposable[Symbol.asyncDispose]()).rejects.toThrowError('boom');
  });
});
