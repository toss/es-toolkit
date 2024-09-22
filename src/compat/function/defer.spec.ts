import { describe, expect, it } from 'vitest';
import { defer } from './defer';

describe('defer', () => {
  it('should provide additional arguments to `func`', (done: () => void) => {
    let args: any[];

    defer(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function (a: any, b: any) {
        // eslint-disable-next-line prefer-rest-params
        args = Array.from(arguments);
      },
      1,
      2
    );

    setTimeout(() => {
      expect(args).toEqual([1, 2]);
      done();
    }, 32);
  });

  it('should be cancelable', (done: () => void) => {
    let pass = true;
    const timerId = defer(() => {
      pass = false;
    });

    clearTimeout(timerId);

    setTimeout(() => {
      expect(pass);
      done();
    }, 32);
  });
});
