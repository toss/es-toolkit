import { describe, it, expect } from 'vitest';
import { spread } from './spread';

describe('spread', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function fn(_a: unknown, _b: unknown, _c: unknown) {
    // eslint-disable-next-line prefer-rest-params
    return Array.from(arguments);
  }

  it('should spread arguments to `func`', () => {
    const spreadFn = spread(fn);
    const expected = [1, 2];

    expect(spreadFn([1, 2])).toEqual(expected);
    expect(spreadFn([1, 2], 3)).toEqual(expected);
  });

  it('should accept a falsey `array`', () => {
    const falsey = [null, undefined, false, 0, NaN, ''];
    const spreadFn = spread(() => true);
    const expected = falsey.map(() => true);

    const actual = falsey.map(array => {
      return spreadFn(array);
    });

    expect(actual).toEqual(expected);
  });

  it('should work with `startIndex`', () => {
    const spreadFn = spread(fn, 1);
    const expected = [1, 2, 3];

    expect(spreadFn(1, [2, 3])).toEqual(expected);
    expect(spreadFn(1, [2, 3], 4)).toEqual(expected);
  });
});
