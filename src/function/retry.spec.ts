import { describe, expect, it, vi } from 'vitest';
import { performance } from 'node:perf_hooks';
import { retry } from './retry';

describe('retry', () => {
  it('should resolve successfully on the first attempt', async () => {
    const func = vi.fn().mockResolvedValue('success');
    const result = await retry(func);
    expect(result).toBe('success');
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should retry the specified number of times and eventually resolve', async () => {
    const func = vi
      .fn()
      .mockRejectedValueOnce(new Error('failure'))
      .mockRejectedValueOnce(new Error('failure'))
      .mockResolvedValue('success');
    const result = await retry(func, 3);
    expect(result).toBe('success');
    expect(func).toHaveBeenCalledTimes(3);
  });

  it('should retry with the specified delay between attempts', async () => {
    const func = vi.fn().mockRejectedValueOnce(new Error('failure')).mockResolvedValue('success');
    const delay = 100;
    const start = performance.now();
    const result = await retry(func, { delay, retries: 2 });
    const end = performance.now();
    expect(result).toBe('success');
    expect(func).toHaveBeenCalledTimes(2);
    expect(end - start).toBeGreaterThanOrEqual(delay);
  });

  it('should retry with a dynamic delay function based on attempt count', async () => {
    const func = vi
      .fn()
      .mockRejectedValueOnce(new Error('failure'))
      .mockRejectedValueOnce(new Error('failure'))
      .mockResolvedValue('success');

    const delays: number[] = [];
    const delayFn = vi.fn(attempt => {
      const d = attempt * 50;
      delays.push(d);
      return d;
    });

    const start = performance.now();
    const result = await retry(func, { delay: delayFn, retries: 3 });
    const end = performance.now();

    const totalDelay = delays.reduce((sum, d) => sum + d, 0);

    expect(result).toBe('success');
    expect(func).toHaveBeenCalledTimes(3);
    expect(end - start).toBeGreaterThanOrEqual(totalDelay);
  });

  it('should throw an error after the specified number of retries', async () => {
    const func = vi.fn().mockRejectedValue(new Error('failure'));
    await expect(retry(func, 3)).rejects.toThrow('failure');
    expect(func).toHaveBeenCalledTimes(3);
  });

  it('should abort the retry operation if the signal is already aborted', async () => {
    const func = vi.fn().mockRejectedValue(new Error('failure'));
    const controller = new AbortController();
    const signal = controller.signal;
    controller.abort();
    await expect(retry(func, { retries: 5, signal })).rejects.toThrow(
      'The retry operation was aborted due to an abort signal.'
    );
    expect(func).toHaveBeenCalledTimes(0);
  });
});
