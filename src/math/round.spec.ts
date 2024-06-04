import { describe, expect, it } from 'vitest';
import { round } from './round';

describe('round function', () => {
  it('rounds a number to zero decimal places by default', () => {
    expect(round(1.5)).toBe(2);
    expect(round(1.4)).toBe(1);
    // JavaScript는 반올림 하는 부분이 정확히 음수 0.5라면 +∞방향, 즉, 정수로 반올림 한다.
    // If the fractional portion is exactly 0.5, the argument is rounded to the next integer in the direction of +∞. (positive number)
    expect(round(-1.5)).toBe(-1);
  });

  it('rounds a number to a specified number of decimal places', () => {
    expect(round(1.2345, 2)).toBe(1.23);
    expect(round(1.2365, 2)).toBe(1.24);
    expect(round(-1.2345, 2)).toBe(-1.23);
    expect(round(-1.2365, 2)).toBe(-1.24);
  });

  it('handles zero precision as default precision', () => {
    expect(round(1.999)).toBe(2);
    expect(round(-1.999)).toBe(-2);
  });

  it('handles negative numbers properly', () => {
    // JavaScript는 반올림 하는 부분이 정확히 음수 0.5라면 +∞방향, 즉, 정수로 반올림 한다.
    // If the fractional portion is exactly 0.5, the argument is rounded to the next integer in the direction of +∞. (positive number)
    expect(round(-1.2345, 3)).toBe(-1.234);
    expect(round(-1.2344, 3)).toBe(-1.234);
  });

  it('rounds correctly at high precision levels', () => {
    expect(round(1.123456789, 5)).toBe(1.12346);
    expect(round(-1.123456789, 5)).toBe(-1.12346);
  });

  it('rounds correctly with edge cases', () => {
    expect(round(1.25, 1)).toBe(1.3);
    // JavaScript는 반올림 하는 부분이 정확히 음수 0.5라면 +∞방향, 즉, 정수로 반올림 한다.
    // If the fractional portion is exactly 0.5, the argument is rounded to the next integer in the direction of +∞. (positive number)
    expect(round(-1.25, 1)).toBe(-1.2);
    // JavaScript는 일반적인 다른 언어들과 다르게 Round half to even 으로 동작하지 않는다.
    // The round function in JavaScript does not work as 'Round half to Even'
    expect(round(-1.35, 1)).toBe(-1.3);
  });
  it('works with zero', () => {
    expect(round(0)).toBe(0);
  });

  it('works with precision leading to no rounding', () => {
    expect(round(8.88888, 5)).toBe(8.88888);
  });
});
