import { describe, expect, it } from 'vitest';
import { trimEnd } from './trimEnd';
import { whitespace } from '../_internal/whitespace';

describe('trimEnd', () => {
  const func = trimEnd;

  it(`\`trimEnd\` should remove trailing whitespace`, () => {
    const string = `${whitespace}a b c${whitespace}`;
    const expected = `${whitespace}a b c`;

    expect(func(string)).toBe(expected);
  });

  it(`\`trimEnd\` should coerce \`string\` to a string`, () => {
    const object = {
      toString: () => `${whitespace}a b c${whitespace}`,
    };
    const expected = `${whitespace}a b c`;

    // eslint-disable-next-line
    // @ts-ignore
    expect(func(object)).toBe(expected);
  });

  it(`\`trimEnd\` should remove trailing \`chars\``, () => {
    const string = '-_-a-b-c-_-';
    const expected = `${'-_-'}a-b-c`;

    expect(func(string, '_-')).toBe(expected);
    expect(func(string, ['-', '_'])).toBe(expected);
  });

  it(`\`trimEnd\` should coerce \`chars\` to a string`, () => {
    const object = { toString: () => '_-' };
    const string = '-_-a-b-c-_-';
    const expected = `${'-_-'}a-b-c`;

    // eslint-disable-next-line
    // @ts-ignore
    expect(func(string, object)).toBe(expected);
  });

  it(`\`trimEnd\` should return an empty string for empty values and \`chars\``, () => {
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

  it(`\`trimEnd\` should work with \`undefined\` or empty string values for \`chars\``, () => {
    const string = `${whitespace}a b c${whitespace}`;
    const expected = `${whitespace}a b c`;

    expect(func(string, undefined)).toBe(expected);
    expect(func(string, '')).toBe(string);
  });

  it(`\`trimEnd\` should work as an iteratee for methods like \`_.map\``, () => {
    const string = Object(`${whitespace}a b c${whitespace}`);
    const trimmed = `${whitespace}a b c`;
    // eslint-disable-next-line
    // @ts-ignore
    const actual = [string, string, string].map(func);

    expect(actual).toEqual([trimmed, trimmed, trimmed]);
  });
});
