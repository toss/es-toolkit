import { describe, expect, it } from 'vitest';
import { addJitter } from './addJitter';

describe('addJitter', () => {
  it('returns a number within the expected symmetric range', () => {
    const delay = 1000;
    const factor = 0.2;
    for (let i = 0; i < 1000; i++) {
      const value = addJitter(delay, factor);
      expect(value).greaterThanOrEqual(delay - delay * factor);
      expect(value).lessThanOrEqual(delay + delay * factor);
    }
  });

  it('never returns a negative value even with large factor', () => {
    for (let i = 0; i < 200; i++) {
      const value = addJitter(10, 5); // range would be [-40, 60] before clamping
      expect(value).greaterThanOrEqual(0);
    }
  });

  it('falls back to Math.random when no rng provided', () => {
    // We cannot easily assert randomness, but can call to ensure no throw and in range.
    const value = addJitter(500, 0.1);
    expect(value).greaterThanOrEqual(450);
    expect(value).lessThanOrEqual(550);
  });

  it('uses custom rng for deterministic output', () => {
    // rng that always returns 1 -> jitter = delay * factor * (2 * 1 - 1) = delay * factor
    const valueMax = addJitter(100, 0.3, () => 1);
    expect(valueMax).toBe(100 + 100 * 0.3);

    // rng that always returns 0 -> jitter = delay * factor * (2 * 0 - 1) = -delay * factor
    const valueMin = addJitter(100, 0.3, () => 0);
    expect(valueMin).toBe(100 - 100 * 0.3);
  });

  it('handles factor = 0 (no jitter)', () => {
    for (let i = 0; i < 10; i++) {
      expect(addJitter(123, 0)).toBe(123);
    }
  });

  it('distribution is roughly centered around the base delay', () => {
    // Statistical sanity check (not strict) to ensure mean is near delay.
    const delay = 200;
    const factor = 0.5;
    const samples = 5000;
    let sum = 0;
    for (let i = 0; i < samples; i++) {
      sum += addJitter(delay, factor);
    }
    const mean = sum / samples;
    // Allow a tolerance of 2% of delay.
    const tolerance = delay * 0.02;
    expect(Math.abs(mean - delay)).lessThanOrEqual(tolerance);
  });
});
