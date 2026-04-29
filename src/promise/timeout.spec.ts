import { describe, expect, it } from 'vitest';
import { timeout } from './timeout.ts';

describe('timeout', () => {
  it('returns a reason if a response is received after the specified wait time', async () => {
    await expect(timeout(50)).rejects.toThrow('The operation was timed out');
  });

  it('should reject with AbortError when aborted via AbortSignal', async () => {
    const controller = new AbortController();
    const { signal } = controller;

    setTimeout(() => controller.abort(), 50);

    await expect(timeout(1000, { signal })).rejects.toThrow('The operation was aborted');
  });

  it('should reject immediately if signal is already aborted', async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(timeout(1000, { signal: controller.signal })).rejects.toThrow('The operation was aborted');
  });
});
