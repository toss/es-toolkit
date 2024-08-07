import { describe, expect, it, expectTypeOf } from 'vitest';
import { getWords } from './getWords';

describe('caseSplitPattern', () => {
  it('should match camelCase', async () => {
    const str = 'camelCase';
    const matches = getWords(str);
    expect(matches).toEqual(['camel', 'Case']);
  });

  it('should match snake_case', async () => {
    const str = 'snake_case';
    const matches = getWords(str);
    expect(matches).toEqual(['snake', 'case']);
  });

  it('should match kebab-case', async () => {
    const str = 'kebab-case';
    const matches = getWords(str);
    expect(matches).toEqual(['kebab', 'case']);
  });

  it('should handle mixed formats', async () => {
    const str = 'camelCase_snake_case-kebabCase';
    const matches = getWords(str);
    expect(matches).toEqual(['camel', 'Case', 'snake', 'case', 'kebab', 'Case']);
  });

  it('should match acronyms', async () => {
    const str = 'HTTPRequest';
    const matches = getWords(str);
    expect(matches).toEqual(['HTTP', 'Request']);
  });

  it('should match special characters', async () => {
    const str = 'special_characters@123';
    const matches = getWords(str);
    expect(matches).toEqual(['special', 'characters', '123']);
  });

  it('should handle leading and trailing whitespace', async () => {
    const str = '  leading_and_trailing_whitespace  ';
    const matches = getWords(str);
    expect(matches).toEqual(['leading', 'and', 'trailing', 'whitespace']);
  });

  it('should handle underscores', async () => {
    const str = 'underscore_case_example';
    const matches = getWords(str);
    expect(matches).toEqual(['underscore', 'case', 'example']);
  });

  it('should handle single character words', async () => {
    const str = 'aB';
    const matches = getWords(str);
    expect(matches).toEqual(['a', 'B']);
  });

  it('should work with hyphens ', () => {
    expect(getWords('--FOO-BAR--')).toEqual(['FOO', 'BAR']);
  });

  it('should work with numbers', () => {
    expect(getWords('foo2bar')).toEqual(['foo', '2', 'bar']);
  });

  it('handles return type properly', async () => {
    expectTypeOf(getWords('camelCase')).toEqualTypeOf<['camel', 'Case']>();
    expectTypeOf(getWords('snake_case')).toEqualTypeOf<['snake', 'case']>();
    expectTypeOf(getWords('kebab-case')).toEqualTypeOf<['kebab', 'case']>();
    expectTypeOf(getWords('camelCase_snake_case-kebabCase')).toEqualTypeOf<
      ['camel', 'Case', 'snake', 'case', 'kebab', 'Case']
    >();
    expectTypeOf(getWords('HTTPRequest')).toEqualTypeOf<['HTTP', 'Request']>();
    expectTypeOf(getWords('special_characters@123')).toEqualTypeOf<['special', 'characters', '123']>();
    expectTypeOf(getWords('  leading_and_trailing_whitespace  ')).toEqualTypeOf<
      ['leading', 'and', 'trailing', 'whitespace']
    >();
    expectTypeOf(getWords('underscore_case_example')).toEqualTypeOf<['underscore', 'case', 'example']>();
    expectTypeOf(getWords('aB')).toEqualTypeOf<['a', 'B']>();
    expectTypeOf(getWords('--FOO-BAR--')).toEqualTypeOf<['FOO', 'BAR']>();
    expectTypeOf(getWords('foo2bar')).toEqualTypeOf<['foo', '2', 'bar']>();
    expectTypeOf(getWords('foo2bar' as string)).toEqualTypeOf<string[]>();
  });
});
