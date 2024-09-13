import { describe, expect, it } from 'vitest';
import { round } from './round';

describe('round', () => {
  it(`\`round\` should return a rounded number without a precision`, () => {
    const actual = round(4.006);
    expect(actual).toBe(4);
  });

  it(`\`round\` should work with a precision of \`0\``, () => {
    const actual = round(4.006, 0);
    expect(actual).toBe(4);
  });

  it(`\`round\` should work with a positive precision`, () => {
    let actual = round(4.016, 2);
    expect(actual).toBe(4.02);

    actual = round(4.1, 2);
    expect(actual).toBe(4.1);

    actual = round(4.4, 2);
    expect(actual).toBe(4.4);
  });

  it(`\`round\` should work with a negative precision`, () => {
    const actual = round(4160, -2);
    expect(actual).toBe(4200);
  });

  it(`\`round\` should coerce \`precision\` to an integer`, () => {
    let actual = round(4.006, NaN);
    expect(actual).toBe(4);

    const expected = 4.02;

    actual = round(4.016, 2.6);
    expect(actual).toBe(expected);

    actual = round(4.016, '+2');
    expect(actual).toBe(expected);
  });

  it(`\`round\` should work with exponential notation and \`precision\``, () => {
    let actual = round(5e1, 2);
    expect(actual).toEqual(50);

    actual = round('5e', 1);
    expect(actual).toEqual(NaN);

    actual = round('5e1e1', 1);
    expect(actual).toEqual(NaN);
  });

  it(`\`round\` should preserve the sign of \`0\``, () => {
    const values = [[0], [-0], ['0'], ['-0'], [0, 1], [-0, 1], ['0', 1], ['-0', 1]];
    const expected = [Infinity, -Infinity, Infinity, -Infinity, Infinity, -Infinity, Infinity, -Infinity];

    // eslint-disable-next-line prefer-spread
    const actual = values.map(args => 1 / round.apply(undefined, args as any));

    expect(actual).toEqual(expected);
  });

  it(`\`round\` should not return \`NaN\` for large \`precision\` values`, () => {
    const results = [round(10.0000001, 1000), round(Number.MAX_SAFE_INTEGER, 293)];

    const expected = results.map(() => false);
    const actual = results.map(Number.isNaN);

    expect(actual).toEqual(expected);
  });

  it(`\`round\` should handle edge cases`, () => {
    expect(round(1.797, 295)).toBe(1.797);
    expect(round(1.797, -295)).toBe(0);
    expect(round(1.792e-295, 295)).toBe(0);
    expect(round(1.792e295, -295)).toBe(2e295);
    expect(round(1.7976931348623157e308, 292)).toBe(NaN);
    expect(round(5e-324, 323)).toBe(0);
    expect(round(5e-324, -323)).toBe(0);
  });
});
