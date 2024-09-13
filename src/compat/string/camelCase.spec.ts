import { describe, it, expect } from 'vitest';
import { camelCase } from './camelCase';

describe('camelCase', () => {
  it('should work with numbers', () => {
    expect(camelCase('12 feet')).toBe('12Feet');
    expect(camelCase('enable 6h format')).toBe('enable6HFormat');
    expect(camelCase('enable 24H format')).toBe('enable24HFormat');
    expect(camelCase('too legit 2 quit')).toBe('tooLegit2Quit');
    expect(camelCase('walk 500 miles')).toBe('walk500Miles');
    expect(camelCase('xhr2 request')).toBe('xhr2Request');
  });

  it('should handle acronyms', () => {
    expect(camelCase('safe HTML')).toBe('safeHtml');
    expect(camelCase('safeHTML')).toBe('safeHtml');

    expect(camelCase('escape HTML entities')).toBe('escapeHtmlEntities');
    expect(camelCase('escapeHTMLEntities')).toBe('escapeHtmlEntities');

    expect(camelCase('XMLHttpRequest')).toBe('xmlHttpRequest');
    expect(camelCase('XmlHTTPRequest')).toBe('xmlHttpRequest');

    // As Lodash test codes, it should be 'ids'. But real lodash returns 'iDs'.
    expect(camelCase('IDs')).toBe('iDs');
    // As Lodash test codes, it should be 'productXmls'. But real lodash returns 'productXmLs'.
    expect(camelCase('Product XMLs')).toBe('productXmLs');
  });

  const strings = ['foo bar', 'Foo bar', 'foo Bar', 'Foo Bar', 'FOO BAR', 'fooBar', '--foo-bar--', '__foo_bar__'];

  it('should convert string to camel case', () => {
    const actual = strings.map(camelCase);
    const expected = actual.map(() => 'fooBar');
    expect(actual).toEqual(expected);
  });

  it('should handle double-converting strings', () => {
    const actual = strings.map(str => camelCase(camelCase(str)));
    const expected = actual.map(() => 'fooBar');
    expect(actual).toEqual(expected);
  });

  it('should remove constraction apostrophes', () => {
    const apostrophes = ["'", '\u2019'];
    const postfixes = ['d', 'll', 'm', 're', 's', 't', 've'];

    const actual = apostrophes.map(apostrophe => postfixes.map(postfix => camelCase(`a b${apostrophe}${postfix} c`)));
    const expected = apostrophes.map(() => postfixes.map(postfixes => `aB${postfixes}C`));

    expect(actual).toEqual(expected);
  });

  it('should remove remove Latin mathematical operators', () => {
    expect(camelCase('\xd7')).toBe('');
    expect(camelCase('\xf7')).toBe('');
  });

  it('should coerce string to a string', () => {
    expect(camelCase(Object('foo bar'))).toBe('fooBar');
    expect(camelCase({ toString: () => 'foo bar' })).toBe('fooBar');
  });
});
