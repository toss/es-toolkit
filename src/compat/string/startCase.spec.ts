import { describe, expect, it } from 'vitest';
import { startCase } from './startCase';

describe('startCase', () => {
  const strings = ['foo bar', 'Foo bar', 'foo Bar', 'Foo Bar', 'FOO BAR', 'fooBar', '--foo-bar--', '__foo_bar__'];

  it(`should convert \`string\``, () => {
    const actual = strings.map(string => startCase(string));

    const expected = strings.map(string => (string === 'FOO BAR' ? 'FOO BAR' : 'Foo Bar'));

    expect(actual).toEqual(expected);
  });

  it('should convert string to start case, identical to lodash', () => {
    expect(startCase('åäöÅÄÖ')).toBe('Aao AAO');
    expect(startCase('helloÅäöWorld')).toBe('Hello Aao World');
    expect(startCase('café')).toBe('Cafe');
    expect(startCase('naïve')).toBe('Naive');
    expect(startCase('Zürich')).toBe('Zurich');
    expect(startCase('São Paulo')).toBe('Sao Paulo');
    expect(startCase('Москва')).toBe('Москва');
  });

  it(`should handle double-converting strings`, () => {
    const actual = strings.map(string => startCase(startCase(string)));

    const expected = strings.map(string => (string === 'FOO BAR' ? 'FOO BAR' : 'Foo Bar'));

    expect(actual).toEqual(expected);
  });

  it(`should remove contraction apostrophes`, () => {
    const postfixes = ['d', 'll', 'm', 're', 's', 't', 've'];

    ["'", '\u2019'].forEach(apos => {
      const actual = postfixes.map(postfix => startCase(`a b${apos}${postfix} c`));

      const expected = postfixes.map(postfix => `A B${postfix} C`);

      expect(actual).toEqual(expected);
    });
  });

  it(`should remove Latin mathematical operators`, () => {
    const actual = ['\xd7', '\xf7'].map(startCase);
    expect(actual).toEqual(['', '']);
  });

  it(`should coerce \`string\` to a string`, () => {
    const string = 'foo bar';
    expect(startCase(Object(string))).toBe('Foo Bar');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(startCase({ toString: () => string })).toBe('Foo Bar');
  });

  it('should uppercase only the first character of each word', () => {
    expect(startCase('--foo-bar--')).toBe('Foo Bar');
    expect(startCase('fooBar')).toBe('Foo Bar');
    expect(startCase('__FOO_BAR__')).toBe('FOO BAR');
  });

  it('should keep ordinal numbers as single words, identical to lodash', () => {
    expect(startCase('foo1stPlace')).toBe('Foo 1st Place');
    expect(startCase('top10th')).toBe('Top 10th');
    expect(startCase('1st place 2nd 3rd 4th')).toBe('1st Place 2nd 3rd 4th');
  });

  it('should only uppercase the first letter of each word', () => {
    expect(startCase('ПриветМир')).toBe('ПриветМир');
    expect(startCase('αβγΔεζ')).toBe('ΑβγΔεζ');
    expect(startCase('fooBAR')).toBe('Foo BAR');
    expect(startCase('mIxEd CaSe')).toBe('M Ix Ed Ca Se');
  });

  it('should uppercase a first letter outside the Basic Multilingual Plane', () => {
    expect(startCase('𐐨𐐩 deseret')).toBe('𐐀 𐐁 Deseret');
  });
});
