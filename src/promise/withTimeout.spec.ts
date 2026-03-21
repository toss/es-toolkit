import { describe, expect, it } from 'vitest';
import { delay } from './delay.ts';
import { withTimeout } from './withTimeout.ts';

describe('withTimeout', () => {
  it('returns the result value if a response is received before the specified wait time', async () => {
    const result = await withTimeout(async () => {
      await delay(50);
      return 'foo';
    }, 100);

    expect(result).toEqual('foo');
  });

  it('returns a reason if a response is received after the specified wait time', () => {
    return expect(withTimeout(() => delay(1000), 50)).rejects.toThrow('The operation was timed out');
  });

  it('should reject with AbortError when aborted via AbortSignal', async () => {
    const controller = new AbortController();

    setTimeout(() => controller.abort(), 50);

    await expect(
      withTimeout(() => delay(1000), 5000, { signal: controller.signal })
    ).rejects.toThrow('The operation was aborted');
  });

  it('should reject immediately if signal is already aborted', async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      withTimeout(() => delay(1000), 5000, { signal: controller.signal })
    ).rejects.toThrow('The operation was aborted');
  });
});
