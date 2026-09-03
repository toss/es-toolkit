import { describe, expect, it } from 'vitest';
import { inverseLerp } from './inverseLerp';
import { lerp } from './lerp';

describe('inverseLerp', () => {
  it('returns 0 when value equals start', () => {
    expect(inverseLerp(0, 100, 0)).toBe(0);
    expect(inverseLerp(10, 20, 10)).toBe(0);
    expect(inverseLerp(-5, 5, -5)).toBe(0);
  });

  it('returns 1 when value equals stop', () => {
    expect(inverseLerp(0, 100, 100)).toBe(1);
    expect(inverseLerp(10, 20, 20)).toBe(1);
    expect(inverseLerp(-5, 5, 5)).toBe(1);
  });

  it('returns where value lies between start and stop as a fraction', () => {
    expect(inverseLerp(0, 100, 50)).toBe(0.5);
    expect(inverseLerp(10, 20, 12.5)).toBe(0.25);
    expect(inverseLerp(-10, 10, 0)).toBe(0.5);
    expect(inverseLerp(0, 1, 0.75)).toBe(0.75);
  });

  it('works when start is greater than stop', () => {
    expect(inverseLerp(100, 0, 75)).toBe(0.25);
    expect(inverseLerp(20, 10, 15)).toBe(0.5);
  });

  it('is not clamped when value is outside [start, stop]', () => {
    expect(inverseLerp(0, 100, 150)).toBe(1.5);
    expect(inverseLerp(0, 100, -50)).toBe(-0.5);
    expect(inverseLerp(10, 20, 30)).toBe(2);
  });

  it('returns 0 when start and stop are equal', () => {
    expect(inverseLerp(5, 5, 5)).toBe(0);
    expect(inverseLerp(5, 5, 10)).toBe(0);
    expect(inverseLerp(5, 5, 0)).toBe(0);
  });

  it('works with decimal inputs', () => {
    expect(inverseLerp(0.1, 0.3, 0.2)).toBeCloseTo(0.5);
    expect(inverseLerp(0.1, 0.7, 0.16)).toBeCloseTo(0.1);
  });

  it('is the inverse of lerp', () => {
    const cases: Array<[number, number, number]> = [
      [0, 100, 0.5],
      [10, 20, 0.25],
      [-5, 5, 0.9],
      [100, 0, 0.3],
      [0.1, 0.3, 0.7],
    ];

    for (const [start, stop, fraction] of cases) {
      expect(inverseLerp(start, stop, lerp(start, stop, fraction))).toBeCloseTo(fraction);
      expect(lerp(start, stop, inverseLerp(start, stop, lerp(start, stop, fraction)))).toBeCloseTo(
        lerp(start, stop, fraction)
      );
    }
  });
});
