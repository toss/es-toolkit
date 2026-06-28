import { describe, expect, it, vi } from 'vitest';
import { delay } from './delay.ts';
import { timeout } from './timeout.ts';

describe('timeout', () => {
  it('returns a reason if a response is received after the specified wait time', async () => {
    await expect(timeout(50)).rejects.toThrow('The operation was timed out');
  });

  it('rejects with a TimeoutError when a non-aborted signal is provided', async () => {
    const controller = new AbortController();
    await expect(timeout(50, { signal: controller.signal })).rejects.toThrow('The operation was timed out');
  });

  it('never settles when aborted before the delay elapses (disarmed, not rejected)', async () => {
    const controller = new AbortController();
    const promise = timeout(50, { signal: controller.signal });

    let settled = false;
    promise.then(
      () => (settled = true),
      () => (settled = true)
    );

    controller.abort();
    await delay(100); // wait past the original deadline

    expect(settled).toBe(false);
  });

  it('never settles when the signal is already aborted', async () => {
    const controller = new AbortController();
    controller.abort();

    const promise = timeout(50, { signal: controller.signal });

    let settled = false;
    promise.then(
      () => (settled = true),
      () => (settled = true)
    );

    await delay(100);

    expect(settled).toBe(false);
  });

  it('clears the underlying timer when aborted, so nothing is left scheduled', () => {
    const controller = new AbortController();
    const spy = vi.spyOn(global, 'clearTimeout');

    void timeout(50, { signal: controller.signal });
    controller.abort();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
