import { describe, expect, it } from 'vitest';
import { padEnd } from './padEnd';

describe('padEnd', () => {
  it('should return the original string if no length and char is provided', () => {
    expect(padEnd('abc')).toBe('abc');
  });

  it('should pad a string on the right side if it is shorter than the length', () => {
    expect(padEnd('abc', 6)).toBe('abc   ');
  });

  it('should pad a string on the right side with custom characters', () => {
    expect(padEnd('abc', 6, '_-')).toBe('abc_-_');
  });

  it('should not pad a string if it has the same length', () => {
    expect(padEnd('abc', 3)).toBe('abc');
  });

  it('should not pad a string if the length is less than the string length', () => {
    expect(padEnd('abc', 2)).toBe('abc');
  });

  it('should not pad a string if the length is not a number', () => {
    expect(padEnd('abc', NaN)).toBe('abc');
  });

  it('should not pad a string if the length is not an integer', () => {
    expect(padEnd('abc', 3.5)).toBe('abc');
  });

  it('should not pad a string if the length is negative', () => {
    expect(padEnd('abc', -3)).toBe('abc');
  });

  it(`\`padEnd\` should not pad if string is >= \`length\``, () => {
    expect(padEnd('abc', 2)).toBe('abc');
    expect(padEnd('abc', 3)).toBe('abc');
  });

  it(`\`padEnd\` should treat negative \`length\` as \`0\``, () => {
    [0, -2].forEach(length => {
      expect(padEnd('abc', length)).toBe('abc');
    });
  });

  it(`\`padEnd\` should coerce \`length\` to a number`, () => {
    ['', '4'].forEach(length => {
      const actual = length ? 'abc ' : 'abc';
      // @ts-expect-error - invalid length
      expect(padEnd('abc', length)).toBe(actual);
    });
  });

  it(`\`padEnd\` should treat nullish values as empty strings`, () => {
    [undefined, '_-'].forEach(chars => {
      const expected = chars ? chars : '  ';
      // @ts-expect-error - invalid string
      expect(padEnd(null, 2, chars)).toBe(expected);
      // @ts-expect-error - invalid string
      expect(padEnd(undefined, 2, chars)).toBe(expected);
      expect(padEnd('', 2, chars)).toBe(expected);
    });
  });

  it('should pad a string to a given length', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, undefined];
    const expected = values.map(() => 'abc   ');

    const actual = values.map((value, index) => (index ? padEnd('abc', 6, value) : padEnd('abc', 6)));

    expect(actual).toEqual(expected);
  });

  it('should truncate pad characters to fit the pad length', () => {
    expect(padEnd('abc', 6, '_-')).toBe('abc_-_');
  });

  it('should coerce `string` to a string', () => {
    const values = [Object('abc'), { toString: () => 'abc' }];
    const expected = values.map(() => true);

    const actual = values.map(value => padEnd(value, 6) === 'abc   ');

    expect(actual).toEqual(expected);
  });
});
