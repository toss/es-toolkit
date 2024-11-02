import { describe, expect, it } from 'vitest';
import { getWords } from './getWords';

describe('caseSplitPattern', () => {
  it('should match camelCase', () => {
    const str = 'camelCase';
    const matches = getWords(str);
    expect(matches).toEqual(['camel', 'Case']);
  });

  it('should match snake_case', () => {
    const str = 'snake_case';
    const matches = getWords(str);
    expect(matches).toEqual(['snake', 'case']);
  });

  it('should match kebab-case', () => {
    const str = 'kebab-case';
    const matches = getWords(str);
    expect(matches).toEqual(['kebab', 'case']);
  });

  it('should handle mixed formats', () => {
    const str = 'camelCase_snake_case-kebabCase';
    const matches = getWords(str);
    expect(matches).toEqual(['camel', 'Case', 'snake', 'case', 'kebab', 'Case']);
  });

  it('should match acronyms', () => {
    const str = 'HTTPRequest';
    const matches = getWords(str);
    expect(matches).toEqual(['HTTP', 'Request']);
  });

  it('should match special characters', () => {
    const str = 'special_characters@123';
    const matches = getWords(str);
    expect(matches).toEqual(['special', 'characters', '123']);
  });

  it('should handle leading and trailing whitespace', () => {
    const str = '  leading_and_trailing_whitespace  ';
    const matches = getWords(str);
    expect(matches).toEqual(['leading', 'and', 'trailing', 'whitespace']);
  });

  it('should handle underscores', () => {
    const str = 'underscore_case_example';
    const matches = getWords(str);
    expect(matches).toEqual(['underscore', 'case', 'example']);
  });

  it('should handle single character words', () => {
    const str = 'aB';
    const matches = getWords(str);
    expect(matches).toEqual(['a', 'B']);
  });

  it('should work with hyphens', () => {
    expect(getWords('--FOO-BAR--')).toEqual(['FOO', 'BAR']);
  });

  it('should work with numbers', () => {
    expect(getWords('foo2bar')).toEqual(['foo', '2', 'bar']);
  });

  it('should match emojis', () => {
    expect(getWords('camelCaseHTTPRequest🚀')).toEqual(['camel', 'Case', 'HTTP', 'Request', '🚀']);
  });

  it('should match accented letters', () => {
    expect(getWords('Lunedì 18 Set')).toEqual(['Lunedì', '18', 'Set']);
  });
});
