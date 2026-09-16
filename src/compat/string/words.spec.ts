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

  it('should match titlecase letters', () => {
    expect(words('ǅ')).toEqual(['ǅ']);
    expect(words('ǅ ǈ ǋ ǲ')).toEqual(['ǅ', 'ǈ', 'ǋ', 'ǲ']);
    expect(words('fooǅBar')).toEqual(['fooǅ', 'Bar']);
  });

  it('should match ordinal numbers', () => {
    expect(words('1st 2nd+3rd--4th@1ST*2ND-3RD_4TH')).toEqual(['1st', '2nd', '3rd', '4th', '1ST', '2ND', '3RD', '4TH']);
    expect(words('٠1st')).toEqual(['٠', '1st']);
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

  it('should use default pattern when guard is provided', () => {
    const result = words('fred, barney, & pebbles', 'custom' as any, {});
    expect(result).toEqual(['fred', 'barney', 'pebbles']);
  });

  it('should convert number pattern to string', () => {
    const result = words('test123', 123 as any);
    expect(result).toEqual(['123']);
  });

  it('should keep an emoji sequence joined by ZWJ as one word', () => {
    expect(words('family 👨‍👩‍👧 end')).toEqual(['family', '👨‍👩‍👧', 'end']);
  });

  it('should keep an emoji with a skin tone modifier as one word', () => {
    expect(words('wave 👋🏽 end')).toEqual(['wave', '👋🏽', 'end']);
  });

  it('should keep a flag emoji formed by two regional indicator symbols as one word', () => {
    expect(words('flag 🇰🇷 end')).toEqual(['flag', '🇰🇷', 'end']);
    expect(words('flag 🏴󠁧󠁢󠁥󠁮󠁧󠁿 end')).toEqual(['flag', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'end']);
  });

  it('should keep a gender-neutral emoji with a skin tone modifier as one word', () => {
    expect(words('🕵🏻‍♂️')).toEqual(['🕵🏻‍♂️']);
  });

  it('should recognize a keycap emoji as a single emoji, not a separate number and symbol', () => {
    expect(words('1️⃣')).toEqual(['1️⃣']);
  });

  it('should recognize Arabic-Indic numerals as a single numeric word', () => {
    expect(words('١٢٣')).toEqual(['١٢٣']);
    expect(words('٣ dogs')).toEqual(['٣', 'dogs']);
  });

  it('should recognize full-width digits as a single numeric word', () => {
    expect(words('１２３')).toEqual(['１２３']);
    expect(words('상품 １２ 개')).toEqual(['상품', '１２', '개']);
  });

  it('should recognize numeric letters (Roman numerals) as a word', () => {
    expect(words('ⅣⅤ')).toEqual(['ⅣⅤ']);
    expect(words('第Ⅳ章')).toEqual(['第Ⅳ章']);
  });

  it('should treat symbols as word characters, aligning with lodash', () => {
    expect(words('a€b')).toEqual(['a€b']);
    expect(words('a→b')).toEqual(['a→b']);
    expect(words('a✓b')).toEqual(['a✓b']);
    expect(words('ⓐⓑ')).toEqual(['ⓐⓑ']);
  });

  it('should keep a combining mark attached to the letter it modifies, returning the same words for NFC and NFD', () => {
    const str = 'café';
    const nfdStr = str.normalize('NFD'); // 'cafe\u0301', length: 5
    const nfcStr = str.normalize('NFC'); // 'caf\u00E9', length: 4

    expect(words(nfcStr)).toEqual([nfcStr]);
    expect(words(nfdStr)).toEqual([nfdStr]);
  });

  it('should not split a decomposed word at the combining mark, returning the same words for NFC and NFD', () => {
    const str = 'abćdef';
    const nfdStr = str.normalize('NFD'); // 'abc\u0301def', length: 7
    const nfcStr = str.normalize('NFC'); // 'ab\u0107def', length: 6

    expect(words(nfcStr)).toEqual([nfcStr]);
    expect(words(nfdStr)).toEqual([nfdStr]);
  });
});
