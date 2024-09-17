import { describe, expect, it } from 'vitest';
import { whitespace } from '../_internal/whitespace';
import { trimStart } from './trimStart';

describe('trimStart', () => {
  const func = trimStart;

  it(`\`trimStart\` should remove leading whitespace`, () => {
    const string = `${whitespace}a b c${whitespace}`;
    const expected = `a b c${whitespace}`;

    expect(func(string)).toBe(expected);
  });

  it(`\`trimStart\` should coerce \`string\` to a string`, () => {
    const object = {
      toString: () => `${whitespace}a b c${whitespace}`,
    };
    const expected = `a b c${whitespace}`;

    // eslint-disable-next-line
    // @ts-ignore
    expect(func(object)).toBe(expected);
  });

  it(`\`trimStart\` should remove leading \`chars\``, () => {
    const string = '-_-a-b-c-_-';
    const expected = `a-b-c${'-_-'}`;

    expect(func(string, '_-')).toBe(expected);
  });

  it(`\`trimStart\` should coerce \`chars\` to a string`, () => {
    const object = { toString: () => '_-' };
    const string = '-_-a-b-c-_-';
    const expected = `a-b-c${'-_-'}`;

    // eslint-disable-next-line
    // @ts-ignore
    expect(func(string, object)).toBe(expected);
  });

  it(`\`trimStart\` should return an empty string for empty values and \`chars\``, () => {
    [null, '_-'].forEach(chars => {
      // eslint-disable-next-line
      // @ts-ignore
      expect(func(null, chars)).toBe('');
      // eslint-disable-next-line
      // @ts-ignore
      expect(func(undefined, chars)).toBe('');
      // eslint-disable-next-line
      // @ts-ignore
      expect(func('', chars)).toBe('');
    });
  });

  it(`\`trimStart\` should work with \`undefined\` or empty string values for \`chars\``, () => {
    const string = `${whitespace}a b c${whitespace}`;
    const expected = `a b c${whitespace}`;

    expect(func(string, undefined)).toBe(expected);
    expect(func(string, '')).toBe(string);
  });

  it(`\`trimStart\` should work as an iteratee for methods like \`_.map\``, () => {
    const string = Object(`${whitespace}a b c${whitespace}`);
    const trimmed = `a b c${whitespace}`;
    // eslint-disable-next-line
    // @ts-ignore
    const actual = [string, string, string].map(func);

    expect(actual).toEqual([trimmed, trimmed, trimmed]);
  });
});
