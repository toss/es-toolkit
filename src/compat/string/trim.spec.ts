import { describe, expect, it } from 'vitest';
import { trim } from './trim';
import { whitespace } from '../_internal/whitespace';

describe('trim', () => {
  const func = trim;

  it(`\`trim\` should remove trailing whitespace`, () => {
    const string = `${whitespace}a b c${whitespace}`;
    const expected = `a b c`;

    expect(func(string)).toBe(expected);
  });

  it(`\`trim\` should coerce \`string\` to a string`, () => {
    const object = {
      toString: () => `${whitespace}a b c${whitespace}`,
    };
    const expected = `a b c`;

    // eslint-disable-next-line
    // @ts-ignore
    expect(func(object)).toBe(expected);
  });

  it(`\`trim\` should remove leading and trailing \`chars\``, () => {
    const string = '-_-a-b-c-_-';
    const expected = `a-b-c`;

    expect(func(string, '_-')).toBe(expected);
    expect(func(string, ['_', '-'])).toBe(expected);
  });

  it(`\`trim\` should coerce \`chars\` to a string`, () => {
    const object = { toString: () => '_-' };
    const string = '-_-a-b-c-_-';
    const expected = `a-b-c`;

    // eslint-disable-next-line
    // @ts-ignore
    expect(func(string, object)).toBe(expected);
  });

  it(`\`trim\` should return an empty string for empty values and \`chars\``, () => {
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

  it(`\`trim\` should work with \`undefined\` or empty string values for \`chars\``, () => {
    const string = `${whitespace}a b c${whitespace}`;
    const expected = `a b c`;

    expect(func(string, undefined)).toBe(expected);
    expect(func(string, '')).toBe(string);
  });

  it(`\`trim\` should work as an iteratee for methods like \`_.map\``, () => {
    const string = Object(`${whitespace}a b c${whitespace}`);
    const trimmed = `a b c`;
    // eslint-disable-next-line
    // @ts-ignore
    const actual = [string, string, string].map(func);

    expect(actual).toEqual([trimmed, trimmed, trimmed]);
  });
});
