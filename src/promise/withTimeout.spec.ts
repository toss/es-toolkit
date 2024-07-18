import { describe, expect, it } from 'vitest';
import { withTimeout } from './withTimeout.ts';

describe('withTimeout', () => {
  it('returns the result value if a response is received before the specified wait time', () => {
    expect(
      withTimeout(
        () =>
          new Promise<string>(resolve => {
            setTimeout(() => {
              resolve('foo');
            }, 50);
          }),
        100
      )
    ).resolves.toEqual('foo');
  });

  it('returns a reason if a response is received after the specified wait time', () => {
    expect(withTimeout(() => new Promise(() => {}), 50)).rejects.toThrow('The operation was timed out');
  });
});
