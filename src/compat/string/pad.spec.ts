import { describe, expect, it } from 'vitest';
import { pad } from './pad';

describe('pad', () => {
  it(`\`pad\` should not pad if string is >= \`length\``, () => {
    expect(pad('abc', 2)).toBe('abc');
    expect(pad('abc', 3)).toBe('abc');
  });

  it(`\`pad\` should treat negative \`length\` as \`0\``, () => {
    [0, -2].forEach(length => {
      expect(pad('abc', length)).toBe('abc');
    });
  });

  it(`\`pad\` should coerce \`length\` to a number`, () => {
    ['', '4'].forEach(length => {
      const actual = length ? 'abc ' : 'abc';
      // @ts-expect-error - invalid length
      expect(pad('abc', length)).toBe(actual);
    });
  });

  it(`\`pad\` should treat nullish values as empty strings`, () => {
    [undefined, '_-'].forEach(chars => {
      const expected = chars ? '__' : '  ';
      // @ts-expect-error - invalid string
      expect(pad(null, 2, chars)).toBe(expected);
      // @ts-expect-error - invalid string
      expect(pad(undefined, 2, chars)).toBe(expected);
      expect(pad('', 2, chars)).toBe(expected);
    });
  });

  it(`\`pad\` should return \`string\` when \`chars\` coerces to an empty string`, () => {
    const values = ['', Object('')];
    const expected = values.map(() => 'abc');

    const actual = values.map(value => pad('abc', 6, value));

    expect(actual).toEqual(expected);
  });

  it('should pad a string to a given length', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, undefined];
    const expected = values.map(() => ' abc  ');

    const actual = values.map((value, index) => (index ? pad('abc', 6, value) : pad('abc', 6)));

    expect(actual).toEqual(expected);
  });

  it('should truncate pad characters to fit the pad length', () => {
    expect(pad('abc', 8)).toBe('  abc   ');
    expect(pad('abc', 8, '_-')).toBe('_-abc_-_');
  });

  it('should coerce `string` to a string', () => {
    const values = [Object('abc'), { toString: () => 'abc' }];
    const expected = values.map(() => true);

    const actual = values.map(value => pad(value, 6) === ' abc  ');

    expect(actual).toEqual(expected);
  });
});
