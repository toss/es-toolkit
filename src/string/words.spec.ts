import { describe, expect, it } from 'vitest';
import { words } from './words';

describe('words', () => {
  it('splits a simple ASCII comma-separated string into words', () => {
    const result = words('fred, barney, & pebbles');
    expect(result).toEqual(['fred', 'barney', 'pebbles']);
  });

  it('splits a string with custom pattern', () => {
    const result = words('fred, barney, & pebbles', /[^, ]+/g);
    expect(result).toEqual(['fred', 'barney', '&', 'pebbles']);
  });

  it('returns an empty array when input is an empty string', () => {
    const result = words('');
    expect(result).toEqual([]);
  });

  it('splits a space-separated string into individual words', () => {
    const result = words('split these words');
    expect(result).toEqual(['split', 'these', 'words']);
  });

  it('splits Unicode emojis and special characters as separate words', () => {
    const result = words('example🚀with✨emojis💡and🔍special🌟characters');
    expect(result).toEqual(['example', '🚀', 'with', '✨', 'emojis', '💡', 'and', '🔍', 'special', '🌟', 'characters']);
  });
});
