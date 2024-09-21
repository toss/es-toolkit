import { describe, it, expect } from 'vitest';
import { upperCase } from './upperCase';
describe('upperCase', () => {
  const strings = ['foo bar', 'Foo bar', 'foo Bar', 'Foo Bar', 'FOO BAR', 'fooBar', '--foo-bar--', '__foo_bar__'];

  it(`should convert \`string\``, () => {
    const actual = strings.map(string => upperCase(string));

    const expected = actual.map(() => 'FOO BAR');

    expect(actual).toEqual(expected);
  });

  it(`should handle double-converting strings`, () => {
    const actual = strings.map(string => upperCase(upperCase(string)));

    const expected = actual.map(() => 'FOO BAR');

    expect(actual).toEqual(expected);
  });

  it(`should remove contraction apostrophes`, () => {
    const postfixes = ['d', 'll', 'm', 're', 's', 't', 've'];

    ["'", '\u2019'].forEach(apos => {
      const actual = postfixes.map(postfix => upperCase(`a b${apos}${postfix} c`));

      const expected = postfixes.map(postfix => `A B${postfix.toUpperCase()} C`);

      expect(actual).toEqual(expected);
    });
  });

  it(`should remove Latin mathematical operators`, () => {
    const actual = ['\xd7', '\xf7'].map(upperCase);
    expect(actual).toEqual(['', '']);
  });

  it(`should coerce \`string\` to a string`, () => {
    const string = 'foo bar';
    expect(upperCase(Object(string))).toBe('FOO BAR');
    expect(upperCase({ toString: () => string })).toBe('FOO BAR');
  });
  it('should uppercase as space-separated words', () => {
    expect(upperCase('--foo-bar--')).toBe('FOO BAR');
    expect(upperCase('fooBar')).toBe('FOO BAR');
    expect(upperCase('__foo_bar__')).toBe('FOO BAR');
  });
});
