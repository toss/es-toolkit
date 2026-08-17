import { describe, expect, it } from 'vitest';
import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('should capitalize the first character of a string', () => {
    expect(capitalize('fred')).toBe('Fred');
    expect(capitalize('Fred')).toBe('Fred');
    expect(capitalize(' fred')).toBe(' fred');
    expect(capitalize(' fred  ')).toBe(' fred  ');
  });

  it('should lowercase the remaining characters', () => {
    expect(capitalize('FRED')).toBe('Fred');
    expect(capitalize('FOO BAR')).toBe('Foo bar');
  });

  it('should return an empty string for an empty string', () => {
    expect(capitalize('')).toBe('');
  });
});
