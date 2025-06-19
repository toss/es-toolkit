import { describe, expect, it } from 'vitest';
import { toKey } from './toKey';

describe('toKey', () => {
  it("converts 0 to '0'", () => {
    expect(toKey(0)).toBe('0');
  });

  it("converts -0 to '-0'", () => {
    expect(toKey(-0)).toBe('-0');
  });
});
