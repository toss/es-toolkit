import { describe, expect, it, vi } from 'vitest';
import { retry } from './retry';
import * as Delay from '../promise/delay';

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
    const retries = 3;

    const result = await retry(func, retries);
    expect(result).toBe('success');
    expect(func).toHaveBeenCalledTimes(retries);
  });

  it('should retry with the specified delay between attempts', async () => {
    const func = vi.fn().mockRejectedValueOnce(new Error('failure')).mockResolvedValue('success');
    const retryMinDelay = 100;
    const retryMaxDelay = 300;
    const retries = 2;
    const delaySpy = vi.spyOn(Delay, 'delay');

    const result = await retry(func, { retryMinDelay, retries });

    expect(result).toBe('success');
    expect(func).toHaveBeenCalledTimes(retries);

    const calls = delaySpy.mock.calls.map(([ms]) => ms);
    calls.forEach(delayTime => {
      expect(delayTime).toBeGreaterThanOrEqual(retryMinDelay);
      expect(delayTime).toBeLessThanOrEqual(retryMaxDelay);
    });
  });

  it('should throw an error after the specified number of retries', async () => {
    const func = vi.fn().mockRejectedValue(new Error('failure'));
    const retries = 3;
    await expect(retry(func, retries)).rejects.toThrow('failure');
    expect(func).toHaveBeenCalledTimes(retries);
  });

  it('should apply randomization to retry delays when randomize is true', async () => {
    const func = vi.fn().mockRejectedValueOnce(new Error('failure')).mockResolvedValue('success');
    const retryMinDelay = 100;
    const retryMaxDelay = 300;
    const randomize = true;
    const factor = 1;
    const retries = 2;

    const delaySpy = vi.spyOn(Delay, 'delay');

    const result = await retry(func, { retryMinDelay, retryMaxDelay, factor, randomize, retries });

    expect(func).toHaveBeenCalledTimes(retries);
    expect(result).toBe('success');

    const calls = delaySpy.mock.calls.map(([ms]) => ms);
    calls.forEach(delayTime => {
      expect(delayTime).toBeGreaterThanOrEqual(retryMinDelay);
      expect(delayTime).toBeLessThanOrEqual(retryMaxDelay);
    });
  });

  it('should increase delay exponentially based on the factor', async () => {
    const func = vi.fn().mockRejectedValue(new Error('failure'));
    const retryMinDelay = 100;
    const factor = 2;
    const retries = 3;

    const delaySpy = vi.spyOn(Delay, 'delay');

    await retry(func, { retryMinDelay, factor, retries }).catch(() => {});

    expect(func).toHaveBeenCalledTimes(3);
    expect(delaySpy).toHaveBeenCalledWith(100);
    expect(delaySpy).toHaveBeenCalledWith(200);
    expect(delaySpy).toHaveBeenCalledWith(400);
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
