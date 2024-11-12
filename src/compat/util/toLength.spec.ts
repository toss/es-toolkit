import { describe, expect, it } from 'vitest';
import { toLength } from './toLength';
import { MAX_ARRAY_LENGTH } from '../_internal/MAX_ARRAY_LENGTH';
import { MAX_INTEGER } from '../_internal/MAX_INTEGER';

describe('toLength', () => {
  it('should return a valid length', () => {
    expect(toLength(null)).toBe(0);
    expect(toLength(-1)).toBe(0);
    expect(toLength('1')).toBe(1);
    expect(toLength(1.1)).toBe(1);
    expect(toLength(MAX_INTEGER)).toBe(MAX_ARRAY_LENGTH);
  });

  it('should return `value` if a valid length', () => {
    expect(toLength(0)).toBe(0);
    expect(toLength(3)).toBe(3);
    expect(toLength(MAX_ARRAY_LENGTH)).toBe(MAX_ARRAY_LENGTH);
  });

  it('should convert `-0` to `0`', () => {
    expect(1 / toLength(-0)).toBe(Infinity);
  });
});
