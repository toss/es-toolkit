import { describe, expect, it } from 'vitest';
import { inRange } from './inRange';
import { falsey } from '../_internal/falsey';
import { stubTrue } from '../_internal/stubTrue';

describe('inRange', () => {
  it('should work with an `end`', () => {
    expect(inRange(3, 5)).toBe(true);
    expect(inRange(5, 5)).toBe(false);
    expect(inRange(6, 5)).toBe(false);
  });

  it('should work with a `start` and `end`', () => {
    expect(inRange(1, 1, 5)).toBe(true);
    expect(inRange(3, 1, 5)).toBe(true);
    expect(inRange(0, 1, 5)).toBe(false);
    expect(inRange(5, 1, 5)).toBe(false);
  });

  it('should treat falsey `start` as `0`', () => {
    falsey.forEach((value, index) => {
      if (index) {
        // eslint-disable-next-line
        // @ts-ignore
        expect(inRange(0, value)).toBe(false);
        // eslint-disable-next-line
        // @ts-ignore
        expect(inRange(0, value, 1)).toBe(true);
      } else {
        // eslint-disable-next-line
        // @ts-ignore
        expect(inRange(0)).toBe(false);
      }
    });
  });

  it('should swap `start` and `end` when `start` > `end`', () => {
    expect(inRange(2, 5, 1)).toBe(true);
    expect(inRange(-3, -2, -6)).toBe(true);
  });

  it('should work with a floating point `n` value', () => {
    expect(inRange(0.5, 5)).toBe(true);
    expect(inRange(1.2, 1, 5)).toBe(true);
    expect(inRange(5.2, 5)).toBe(false);
    expect(inRange(0.5, 1, 5)).toBe(false);
  });

  it('should coerce arguments to finite numbers', () => {
    const actual = [
      // eslint-disable-next-line
      // @ts-ignore
      inRange(0, '1'),
      // eslint-disable-next-line
      // @ts-ignore
      inRange(0, '0', 1),
      // eslint-disable-next-line
      // @ts-ignore
      inRange(0, 0, '1'),
      inRange(0, NaN, 1),
      inRange(-1, -1, NaN),
    ];

    expect(actual).toEqual(actual.map(stubTrue));
  });
});
