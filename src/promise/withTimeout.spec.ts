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

  it('times out when a non-aborted signal is provided', () => {
    const controller = new AbortController();

    return expect(withTimeout(() => delay(1000), 50, { signal: controller.signal })).rejects.toThrow(
      'The operation was timed out'
    );
  });

  it('lifts the time limit when the signal is aborted, resolving with the run result', async () => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 25); // disarm before the 50ms deadline

    const result = await withTimeout(
      async () => {
        await delay(100); // outlives the 50ms timeout
        return 'foo';
      },
      50,
      { signal: controller.signal }
    );

    expect(result).toEqual('foo');
  });
});
