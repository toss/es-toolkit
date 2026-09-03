import { describe, expect, it } from 'vitest';
import { lerp } from './lerp';

describe('lerp', () => {
  it('returns start when fraction is 0', () => {
    expect(lerp(0, 100, 0)).toBe(0);
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(-5, 5, 0)).toBe(-5);
  });

  it('returns stop when fraction is 1', () => {
    expect(lerp(0, 100, 1)).toBe(100);
    expect(lerp(10, 20, 1)).toBe(20);
    expect(lerp(-5, 5, 1)).toBe(5);
  });

  it('returns exactly stop when fraction is 1 even if start + (stop - start) would round', () => {
    expect(lerp(-7.219779231267269, 9.792664575659987, 1)).toBe(9.792664575659987);
    expect(lerp(7.801196055542206, -5.783740202537673, 1)).toBe(-5.783740202537673);
  });

  it('returns the number at fraction of the way between start and stop', () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(10, 20, 0.25)).toBe(12.5);
    expect(lerp(0, 1, 0.75)).toBe(0.75);
    expect(lerp(-10, 10, 0.5)).toBe(0);
  });

  it('works when start is greater than stop', () => {
    expect(lerp(100, 0, 0.25)).toBe(75);
    expect(lerp(20, 10, 0.5)).toBe(15);
  });

  it('continues past start or stop when fraction is outside [0, 1]', () => {
    expect(lerp(0, 100, 1.5)).toBe(150);
    expect(lerp(0, 100, -0.5)).toBe(-50);
    expect(lerp(10, 20, 2)).toBe(30);
  });

  it('returns start when start and stop are equal', () => {
    expect(lerp(5, 5, 0)).toBe(5);
    expect(lerp(5, 5, 0.7)).toBe(5);
    expect(lerp(5, 5, 1)).toBe(5);
    expect(lerp(0.1, 0.1, 0.3)).toBe(0.1);
  });

  it('works with decimal inputs', () => {
    expect(lerp(0.1, 0.3, 0.5)).toBeCloseTo(0.2);
    expect(lerp(0.1, 0.7, 0.1)).toBeCloseTo(0.16);
  });
});
