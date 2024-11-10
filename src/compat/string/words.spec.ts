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

  it('correctly handles a string with multiple number inputs', () => {
    const result = words('-0 +0 -3 +3 -4 +4');
    expect(result).toEqual(['0', '0', '3', '3', '4', '4']);
  });

  it('splits a space-separated string into individual words', () => {
    const result = words('split these words');
    expect(result).toEqual(['split', 'these', 'words']);
  });

  it('splits a number input as a single word', () => {
    const result = words(3);
    expect(result).toEqual(['3']);
  });

  it('splits -0 as a single word preserving sign', () => {
    const result = words(-0);
    expect(result).toEqual(['0']);
  });

  it('splits a string representation of an array', () => {
    const result = words([1, 2, 3]);
    expect(result).toEqual(['1', '2', '3']);
  });

  it('returns an empty array when input is null', () => {
    const result = words(null);
    expect(result).toEqual([]);
  });

  it('returns an empty array when input is undefined', () => {
    const result = words(undefined);
    expect(result).toEqual([]);
  });

  it('correctly handles a string with Unicode emojis and special characters', () => {
    const result = words('example🚀with✨emojis💡and🔍special🌟characters');
    expect(result).toEqual(['example', '🚀', 'with', '✨', 'emojis', '💡', 'and', '🔍', 'special', '🌟', 'characters']);
  });
});
