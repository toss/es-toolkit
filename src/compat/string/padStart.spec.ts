import { describe, expect, it } from 'vitest';
import { padStart } from './padStart';

describe('padStart', () => {
  it('should return the original string if no length and char is provided', () => {
    expect(padStart('abc')).toBe('abc');
  });

  it('should pad a string on the left side if it is shorter than the length', () => {
    expect(padStart('abc', 6)).toBe('   abc');
  });

  it('should pad a string on the left side with custom characters', () => {
    expect(padStart('abc', 6, '_-')).toBe('_-_abc');
  });

  it('should not pad a string if it has the same length', () => {
    expect(padStart('abc', 3)).toBe('abc');
  });

  it('should not pad a string if the length is less than the string length', () => {
    expect(padStart('abc', 2)).toBe('abc');
  });

  it('should not pad a string if the length is not a number', () => {
    expect(padStart('abc', NaN)).toBe('abc');
  });

  it('should not pad a string if the length is not an integer', () => {
    expect(padStart('abc', 3.5)).toBe('abc');
  });

  it('should not pad a string if the length is negative', () => {
    expect(padStart('abc', -3)).toBe('abc');
  });

  it(`\`padStart\` should not pad if string is >= \`length\``, () => {
    expect(padStart('abc', 2)).toBe('abc');
    expect(padStart('abc', 3)).toBe('abc');
  });

  it(`\`padStart\` should treat negative \`length\` as \`0\``, () => {
    [0, -2].forEach(length => {
      expect(padStart('abc', length)).toBe('abc');
    });
  });

  it(`\`padStart\` should coerce \`length\` to a number`, () => {
    ['', '4'].forEach(length => {
      const actual = length ? ' abc' : 'abc';
      // @ts-expect-error - invalid length
      expect(padStart('abc', length)).toBe(actual);
    });
  });

  it(`\`padStart\` should treat nullish values as empty strings`, () => {
    [undefined, '_-'].forEach(chars => {
      const expected = chars ? chars : '  ';
      // @ts-expect-error - invalid string
      expect(padStart(null, 2, chars)).toBe(expected);
      // @ts-expect-error - invalid string
      expect(padStart(undefined, 2, chars)).toBe(expected);
      expect(padStart('', 2, chars)).toBe(expected);
    });
  });

  it('should pad a string to a given length', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, undefined];
    const expected = values.map(() => '   abc');

    const actual = values.map((value, index) => (index ? padStart('abc', 6, value) : padStart('abc', 6)));

    expect(actual).toEqual(expected);
  });

  it('should truncate pad characters to fit the pad length', () => {
    expect(padStart('abc', 6, '_-')).toBe('_-_abc');
  });

  it('should coerce `string` to a string', () => {
    const values = [Object('abc'), { toString: () => 'abc' }];
    const expected = values.map(() => true);

    const actual = values.map(value => padStart(value, 6) === '   abc');

    expect(actual).toEqual(expected);
  });
});
