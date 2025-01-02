import { describe, expect, it } from 'vitest';
import { delay } from './delay';
import { delay as delayToolkit } from '../../promise';
import { slice } from '../_internal/slice';

describe('delay', () => {
  it('should delay `func` execution', async () => {
    let pass = false;
    delay(() => {
      pass = true;
    }, 32);

    setTimeout(() => {
      expect(pass).toBe(false);
    }, 1);

    await delayToolkit(64);

    expect(pass).toBe(true);
  });

  it('should provide additional arguments to `func`', async () => {
    let args;
    delay(
      function () {
        // eslint-disable-next-line prefer-rest-params
        args = slice.call(arguments);
      },
      32,
      1,
      2
    );

    await delayToolkit(64);

    expect(args).toEqual([1, 2]);
  });

  it('should use a default `wait` of `0`', async () => {
    let pass = false;
    // @ts-expect-error invalid type
    delay(() => {
      pass = true;
    });

    expect(pass).toBe(false);

    await delayToolkit(0);

    expect(pass).toBe(true);
  });

  it('should be cancelable', async () => {
    let pass = true;
    const timerId = delay(() => {
      pass = false;
    }, 32);

    clearTimeout(timerId);

    await delayToolkit(64);

    expect(pass).toBe(true);
  });

  it('should work with mocked `setTimeout`', () => {
    let pass = false;
    const originalSetTimeout = globalThis.setTimeout;

    // @ts-expect-error invalid type
    global.setTimeout = (func: () => void) => {
      func();
    };

    delay(() => {
      pass = true;
    }, 32);

    expect(pass).toBe(true);

    global.setTimeout = originalSetTimeout;
  });

  it('should throw an error if `func` is not a function', () => {
    expect(() => {
      // @ts-expect-error invalid type
      delay('hello', 1000);
    }).toThrow('Expected a function');
  });
});
