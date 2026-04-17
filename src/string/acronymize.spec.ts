import { describe, expect, it } from 'vitest';
import { acronymize } from './acronymize';

describe('acronymize', () => {
  it('should work with an empty string', () => {
    expect(acronymize('')).toBe('');
    expect(acronymize('   ')).toBe('');
  });

  it('should work with just a single word', () => {
    expect(acronymize('hello')).toBe('H');
  });

  it('should form a word containing only first letter of each word', () => {
    expect(acronymize('Portable Network Graphics')).toBe('PNG');
  });

  it('should always output acronym in all uppercase', () => {
    expect(acronymize('best friend forever')).toBe('BFF');
    expect(acronymize('manchester United football Club')).toBe('MUFC');
  });

  it('should work with words with mixed separators', () => {
    expect(acronymize('HyperText Markup Language')).toBe('HTML');
    expect(acronymize('Catherine Zeta-Jones')).toBe('CZJ');
    expect(acronymize('J. K. Rowling')).toBe('JKR');
  });

  it('should work with strings with trailing whitespaces', () => {
    expect(acronymize('   Random Access Memory   ')).toBe('RAM');
  });

  it('should work with words that start with numbers', () => {
    expect(acronymize('3D Graphics Library')).toBe('3DGL');
  });

  it('should ignore special characters', () => {
    expect(acronymize('@Home !Network')).toBe('HN');
  });

  it('should ignore emojis', () => {
    expect(acronymize('😀 Happy Face')).toBe('HF');
  });

  it('should work with non-BMP letters', () => {
    expect(acronymize('𐐷𐐲𐑉𐑌𐐻 𐐹𐐲𐑉𐑁𐐭𐑋𐑌𐑅')).toBe('𐐏𐐑');
    expect(acronymize('𐐷eseret 𐐹erformance')).toBe('𐐏𐐑');
  });

  it('should preserve non-BMP uppercase letters in acronyms', () => {
    expect(acronymize('𝔘nicode 𝐓esting')).toBe('𝔘𝐓');
  });
});
