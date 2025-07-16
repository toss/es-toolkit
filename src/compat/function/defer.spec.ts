import { describe, expect, expectTypeOf, it } from 'vitest';
import type { defer as deferLodash } from 'lodash';
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

  it('should throw an error if `func` is not a function', () => {
    expect(() => defer(1 as any)).toThrow();
  });

  it('should match the type of lodash', () => {
    expectTypeOf(defer).toEqualTypeOf<typeof deferLodash>();
  });
});
