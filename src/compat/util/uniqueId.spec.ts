import { describe, expect, it } from 'vitest';
import { uniqueId } from './uniqueId';

describe('uniqueId', () => {
  it('should generate unique ids', () => {
    const actual = Array.from({ length: 1000 }, () => uniqueId());

    expect(new Set(actual).size).toBe(actual.length);
  });

  it('should return a string value when not providing a `prefix`', () => {
    expect(typeof uniqueId()).toBe('string');
  });
});
