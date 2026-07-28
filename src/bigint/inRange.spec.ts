import { describe, expect, it } from 'vitest';
import { inRange } from './inRange';

describe('inRange', () => {
  it('checks against [0n, maximum) when called with two arguments', () => {
    expect(inRange(3n, 5n)).toBe(true);
    expect(inRange(5n, 5n)).toBe(false);
    expect(inRange(-1n, 5n)).toBe(false);
  });

  it('checks against [minimum, maximum) when called with three arguments', () => {
    expect(inRange(5n, 0n, 10n)).toBe(true);
    expect(inRange(0n, 0n, 10n)).toBe(true);
    expect(inRange(10n, 0n, 10n)).toBe(false);
  });

  it('handles negative ranges', () => {
    expect(inRange(-3n, -5n, -1n)).toBe(true);
    expect(inRange(-5n, -5n, -1n)).toBe(true);
    expect(inRange(-1n, -5n, -1n)).toBe(false);
  });

  it('stays exact beyond Number.MAX_SAFE_INTEGER', () => {
    expect(inRange(9007199254740993n, 0n, 9007199254740994n)).toBe(true);
    expect(inRange(9007199254740994n, 0n, 9007199254740994n)).toBe(false);
  });

  it('throws when the minimum is greater than or equal to the maximum', () => {
    expect(() => inRange(3n, 5n, 5n)).toThrowError('The maximum value must be greater than the minimum value.');
    expect(() => inRange(3n, 6n, 5n)).toThrowError('The maximum value must be greater than the minimum value.');
  });
});
