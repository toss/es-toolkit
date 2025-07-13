import { describe, expect, expectTypeOf, it } from 'vitest';
import { trimEnd } from 'es-toolkit/compat';
import type { trimEnd as trimEndLodash } from 'lodash';
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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

  it(`\`trimEnd\` should support character arrays`, () => {
    const string = 'hello world';
    const expected = 'hello wo';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(func(string, ['rld'])).toBe(expected);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(func(string, ['rl', 'd'])).toBe(expected);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(func(string, ['d', 'lr'])).toBe(expected);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(func(string, ['d', 'l', 'r'])).toBe(expected);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(trimEnd).toEqualTypeOf<typeof trimEndLodash>();
  });
});
