import { describe, expect, it } from 'vitest';
import { serializeNumber } from './serializeNumber';

describe('serializeNumber', () => {
  it('should serialize integers', () => {
    expect(serializeNumber(0)).toBe('0');
    expect(serializeNumber(100)).toBe('100');
    expect(serializeNumber(-100)).toBe('-100');
  });

  it('should serialize -0 as 0', () => {
    expect(serializeNumber(-0)).toBe('0');
  });

  it('should serialize floating point numbers', () => {
    expect(serializeNumber(1.5)).toBe('1.5');
    expect(serializeNumber(Number.EPSILON)).toBe('2.220446049250313e-16');
  });

  it('should serialize NaN and Infinity', () => {
    expect(serializeNumber(NaN)).toBe('NaN');
    expect(serializeNumber(Infinity)).toBe('Infinity');
    expect(serializeNumber(-Infinity)).toBe('-Infinity');
  });
});
