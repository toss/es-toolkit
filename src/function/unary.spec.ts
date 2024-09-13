import { describe, expect, it } from 'vitest';
import { unary } from './unary';

describe('unary', () => {
  it('should cap the number of arguments provided to `func`', () => {
    const actual = ['6', '8', '10'].map(unary(parseInt));
    expect(actual).toEqual([6, 8, 10]);
  });

  it('should not force a minimum argument count', () => {
    function fn() {
      // eslint-disable-next-line prefer-rest-params
      return Array.from(arguments);
    }
    const capped = unary(fn);
    expect(capped()).toEqual([]);
  });

  it('should use `this` binding of function', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const capped = unary(function (this: unknown, _a: unknown, _b: unknown) {
      return this;
    });
    const object = { capped: capped };

    expect(object.capped(1)).toBe(object);
  });
});
