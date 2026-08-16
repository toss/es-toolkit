import { describe, expect, it } from 'vitest';
import { before } from './before';

describe('before', () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  function _before(n: number, times: number) {
    let count = 0;
    const innerBefore = before(n, () => {
      count++;
    });

    for (let i = 0; i < times; i++) {
      innerBefore();
    }

    return count;
  }

  it('should create a function that invokes `func` after `n` calls', () => {
    expect(_before(5, 4), 'before(n) should invoke `func` before being called `n` times').toBe(4);
    expect(_before(5, 6), 'before(n) should not invoke `func` after being called `n - 1` times').toBe(4);
    expect(_before(0, 0), 'before(0) should not invoke `func` immediately').toBe(0);
    expect(_before(0, 1), 'before(0) should not invoke `func` when called').toBe(0);
  });

  it('should coerce `n` values of `NaN` to `0`', () => {
    expect(_before(NaN, 1)).toBe(0);
  });

  it('should use `this` binding of function', () => {
    const _before = before(2, function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return ++this.count;
    });
    const object = { before: _before, count: 0 };

    object.before();
    expect(object.before()).toBe(1);
    expect(object.count).toBe(1);
  });

  it('should throw an error if `func` is not a function', () => {
    expect(() => before(1, 1 as any)).toThrow(TypeError);
  });
});
