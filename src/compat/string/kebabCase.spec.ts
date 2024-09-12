import { describe, it, expect } from 'vitest';
import { kebabCase } from './kebabCase';

describe('kebabCase', () => {
  const strings = ['foo bar', 'Foo bar', 'foo Bar', 'Foo Bar', 'FOO BAR', 'fooBar', '--foo-bar--', '__foo_bar__'];

  it(`should convert \`string\``, () => {
    const actual = strings.map(string => kebabCase(string));

    const expected = actual.map(() => 'foo-bar');

    expect(actual).toEqual(expected);
  });

  it(`should handle double-converting strings`, () => {
    const actual = strings.map(string => kebabCase(kebabCase(string)));

    const expected = actual.map(() => 'foo-bar');

    expect(actual).toEqual(expected);
  });

  it(`should remove contraction apostrophes`, () => {
    const postfixes = ['d', 'll', 'm', 're', 's', 't', 've'];

    ["'", '\u2019'].forEach(apos => {
      const actual = postfixes.map(postfix => kebabCase(`a b${apos}${postfix} c`));

      const expected = postfixes.map(postfix => `a-b${postfix}-c`);

      expect(actual).toEqual(expected);
    });
  });

  it(`should remove Latin mathematical operators`, () => {
    const actual = ['\xd7', '\xf7'].map(kebabCase);
    expect(actual).toEqual(['', '']);
  });

  it(`should coerce \`string\` to a string`, () => {
    const string = 'foo bar';
    expect(kebabCase(Object(string))).toBe('foo-bar');
    expect(kebabCase({ toString: () => string })).toBe('foo-bar');
  });
});
