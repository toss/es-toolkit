import { describe, expect, it } from 'vitest';
import { defer } from './defer';

describe('defer', () => {
  it('should provide additional arguments to `func`', (done: () => void) => {
    let args: any[];

    defer(
      function (a: any, b: any) {
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
