import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { retry } from './retry';

describe('retry', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

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

    const promise = retry(func, 3);

    // 2 failures with delay: 0 (default), use advanceTimersToNextTimerAsync for precise control
    await vi.advanceTimersToNextTimerAsync();
    await vi.advanceTimersToNextTimerAsync();

    const result = await promise;
    expect(result).toBe('success');
    expect(func).toHaveBeenCalledTimes(3);
  });

  it('should retry with the specified delay between attempts', async () => {
    const func = vi.fn().mockRejectedValueOnce(new Error('failure')).mockResolvedValue('success');
    const delayMs = 100;

    const start = Date.now();
    const promise = retry(func, { delay: delayMs, retries: 2 });

    await vi.advanceTimersByTimeAsync(delayMs);

    const result = await promise;
    const end = Date.now();

    expect(result).toBe('success');
    expect(func).toHaveBeenCalledTimes(2);
    expect(end - start).toBeGreaterThanOrEqual(delayMs);
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

    const start = Date.now();
    const promise = retry(func, { delay: delayFn, retries: 3 });

    await vi.advanceTimersByTimeAsync(50);
    await vi.advanceTimersByTimeAsync(100);

    const result = await promise;
    const end = Date.now();

    const totalDelay = delays.reduce((sum, d) => sum + d, 0);

    expect(result).toBe('success');
    expect(func).toHaveBeenCalledTimes(3);
    expect(end - start).toBeGreaterThanOrEqual(totalDelay);
  });

  it('should throw an error after the specified number of retries', async () => {
    const func = vi.fn().mockRejectedValue(new Error('failure'));

    const promise = retry(func, 3).catch(e => e);

    // 3 failures with delay: 0 (default), use advanceTimersToNextTimerAsync for precise control (2 delays between 3 attempts)
    await vi.advanceTimersToNextTimerAsync();
    await vi.advanceTimersToNextTimerAsync();

    const error = await promise;
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe('failure');
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
