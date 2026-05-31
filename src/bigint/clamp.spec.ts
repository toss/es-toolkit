import { describe, expect, it } from 'vitest';
import { clamp } from './clamp';

describe('clamp', () => {
  it('works with an upper bound only', () => {
    expect(clamp(3n, 5n)).toBe(3n);
    expect(clamp(10n, 6n)).toBe(6n);
    expect(clamp(6n, 10n)).toBe(6n);
  });

  it('works with lower and upper bounds', () => {
    expect(clamp(3n, 5n, 10n)).toBe(5n);
    expect(clamp(10n, 6n, 10n)).toBe(10n);
    expect(clamp(7n, 5n, 10n)).toBe(7n);
    expect(clamp(100n, 5n, 6n)).toBe(6n);
  });

  it('works with negative bounds', () => {
    expect(clamp(-10n, -5n, 5n)).toBe(-5n);
    expect(clamp(10n, -5n, 5n)).toBe(5n);
  });
});
