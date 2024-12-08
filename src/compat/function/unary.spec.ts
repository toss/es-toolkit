import { describe, expect, it } from 'vitest';
import { unary } from '../../function';
import { map } from '../array/map';

describe('unary', () => {
  function fn() {
    return Array.prototype.slice.call(arguments);
  }

  it('should cap the number of arguments provided to `func`', () => {
    const actual = map(['6', '8', '10'], unary(parseInt));
    expect(actual).toEqual([6, 8, 10]);
  });

  it('should not force a minimum argument count', () => {
    const capped = unary(fn);
    expect(capped()).toEqual([]);
  });

  it('should use `this` binding of function', () => {
    const capped = unary(function (this: any, a: unknown, b: unknown) {
      return this;
    });
    const object = { capped: capped };

    expect(object.capped()).toBe(object);
  });
});
