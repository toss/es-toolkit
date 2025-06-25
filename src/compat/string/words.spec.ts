import { describe, expect, expectTypeOf, it } from 'vitest';
import type { words as wordsLodash } from 'lodash';
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
    const result = words('+0 -3 +3 -4 +4');
    expect(result).toEqual(['0', '3', '3', '4', '4']);
  });

  it('splits a space-separated string into individual words', () => {
    const result = words('split these words');
    expect(result).toEqual(['split', 'these', 'words']);
  });

  it('splits a string representation of an array', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const result = words([1, 2, 3]);
    expect(result).toEqual(['1', '2', '3']);
  });

  it('returns an empty array when input is undefined', () => {
    const result = words(undefined);
    expect(result).toEqual([]);
  });

  it('correctly handles a string with Unicode emojis and special characters', () => {
    const result = words('example🚀with✨emojis💡and🔍special🌟characters');
    expect(result).toEqual(['example', '🚀', 'with', '✨', 'emojis', '💡', 'and', '🔍', 'special', '🌟', 'characters']);
  });

  it('should match accented letters', () => {
    expect(words('Lunedì 18 Set')).toEqual(['Lunedì', '18', 'Set']);
  });

  it('should match Hindi characters', () => {
    expect(words('नमस्ते नमस्ते')).toEqual(['नमस्ते', 'नमस्ते']);
  });

  it('should match ordinal numbers', () => {
    expect(words('1st 2nd+3rd--4th@1ST*2ND-3RD_4TH')).toEqual(['1st', '2nd', '3rd', '4th', '1ST', '2ND', '3RD', '4TH']);
  });

  it('should match contractions', () => {
    expect(words("I don't+can't-won't-DON'T*THEY'RE-I'LL")).toEqual([
      'I',
      "don't",
      "can't",
      "won't",
      "DON'T",
      "THEY'RE",
      "I'LL",
    ]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(words).toEqualTypeOf<typeof wordsLodash>();
  });
});
