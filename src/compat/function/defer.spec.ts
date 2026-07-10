import { describe, expect, it } from 'vitest';
import { defer } from './defer';
import { delay } from '../../promise';

describe('defer', () => {
  it('should provide additional arguments to `func`', async () => {
    let args: any[] = [];

    defer(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function (a: any, b: any) {
        // eslint-disable-next-line prefer-rest-params
        args = Array.from(arguments);
      },
      1,
      2
    );

    await delay(32);
    expect(args).toEqual([1, 2]);
  });

  it('should be cancelable', async () => {
    let pass = true;
    const timerId = defer(() => {
      pass = false;
    });

    clearTimeout(timerId);

    await delay(32);
    expect(pass).toBe(true);
  });

  it('should throw an error if `func` is not a function', () => {
    expect(() => defer(1 as any)).toThrow();
  });
});
