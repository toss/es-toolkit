import { describe, expect, it, vi } from 'vitest';
import { timeout } from './timeout';

describe('timeout', () => {
  it('returns the result value if a response is received before the specified wait time', () => {
    expect(
      timeout(
        new Promise(resolve => {
          setTimeout(() => {
            resolve('foo');
          }, 50);
        }),
        100
      )
    ).resolves.toEqual('foo');
  });

  it('returns a reason if a response is received after the specified wait time', () => {
    expect(timeout(new Promise(() => {}), 50)).rejects.toThrow('The operation was timed out');
  });

  it('should cancel the timeout if aborted via AbortSignal', () => {
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 50);

    expect(timeout(new Promise(() => {}), 100, { signal })).rejects.toThrow('The operation was aborted');
  });

  it('should not call the timeout if it is already aborted by AbortSignal', async () => {
    const controller = new AbortController();
    const { signal } = controller;
    const spy = vi.spyOn(global, 'setTimeout');

    controller.abort();

    await expect(timeout(new Promise(() => {}), 100, { signal })).rejects.toThrow('The operation was aborted');

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should clear timeout when aborted by AbortSignal', async () => {
    const controller = new AbortController();
    const { signal } = controller;
    const spy = vi.spyOn(global, 'clearTimeout');
    const promise = timeout(new Promise(() => {}), 100, { signal });

    controller.abort();

    await expect(promise).rejects.toThrow('The operation was aborted');

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
