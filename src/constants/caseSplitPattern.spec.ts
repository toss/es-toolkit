import { describe, expect, it } from 'vitest';
import { CASE_SPLIT_PATTERN } from './caseSplitPattern';
describe('caseSplitPattern', () => {
  it('should match camelCase', async () => {
    const str = 'camelCase';
    const matches = str.match(CASE_SPLIT_PATTERN);
    expect(matches).toEqual(['camel', 'Case']);
  });

  it('should match snake_case', async () => {
    const str = 'snake_case';
    const matches = str.match(CASE_SPLIT_PATTERN);
    expect(matches).toEqual(['snake', 'case']);
  });

  it('should match kebab-case', async () => {
    const str = 'kebab-case';
    const matches = str.match(CASE_SPLIT_PATTERN);
    expect(matches).toEqual(['kebab', 'case']);
  });

  it('should handle mixed formats', async () => {
    const str = 'camelCase_snake_case-kebabCase';
    const matches = str.match(CASE_SPLIT_PATTERN);
    expect(matches).toEqual(['camel', 'Case', 'snake', 'case', 'kebab', 'Case']);
  });

  it('should match acronyms', async () => {
    const str = 'HTTPRequest';
    const matches = str.match(CASE_SPLIT_PATTERN);
    expect(matches).toEqual(['HTTP', 'Request']);
  });

  it('should match special characters', async () => {
    const str = 'special_characters@123';
    const matches = str.match(CASE_SPLIT_PATTERN);
    expect(matches).toEqual(['special', 'characters', '123']);
  });

  it('should handle leading and trailing whitespace', async () => {
    const str = '  leading_and_trailing_whitespace  ';
    const matches = str.match(CASE_SPLIT_PATTERN);
    expect(matches).toEqual(['leading', 'and', 'trailing', 'whitespace']);
  });

  it('should handle underscores', async () => {
    const str = 'underscore_case_example';
    const matches = str.match(CASE_SPLIT_PATTERN);
    expect(matches).toEqual(['underscore', 'case', 'example']);
  });

  it('should handle single character words', async () => {
    const str = 'aB';
    const matches = str.match(CASE_SPLIT_PATTERN);
    expect(matches).toEqual(['a', 'B']);
  });
});
