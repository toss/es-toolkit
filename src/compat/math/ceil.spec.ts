import { describe, expect, it } from 'vitest';
import { ceil } from './ceil';

describe('ceil', () => {
  it(`\`ceil\` should return a rounded number without a precision`, () => {
    const actual = ceil(4.006);
    expect(actual).toBe(5);
  });

  it(`\`ceil\` should work with a precision of \`0\``, () => {
    const actual = ceil(4.006, 0);
    expect(actual).toBe(5);
  });

  it(`\`ceil\` should work with a positive precision`, () => {
    let actual = ceil(4.016, 2);
    expect(actual).toBe(4.02);

    actual = ceil(4.1, 2);
    expect(actual).toBe(4.1);

    actual = ceil(4.4, 2);
    expect(actual).toBe(4.4);
  });

  it(`\`ceil\` should work with a negative precision`, () => {
    const actual = ceil(4160, -2);
    expect(actual).toBe(4200);
  });

  it(`\`ceil\` should coerce \`precision\` to an integer`, () => {
    let actual = ceil(4.006, NaN);
    expect(actual).toBe(5);

    const expected = 4.02;

    actual = ceil(4.016, 2.6);
    expect(actual).toBe(expected);

    actual = ceil(4.016, '+2');
    expect(actual).toBe(expected);
  });

  it(`\`ceil\` should work with exponential notation and \`precision\``, () => {
    let actual = ceil(5e1, 2);
    expect(actual).toEqual(50);

    actual = ceil('5e', 1);
    expect(actual).toEqual(NaN);

    actual = ceil('5e1e1', 1);
    expect(actual).toEqual(NaN);
  });

  it(`\`ceil\` should preserve the sign of \`0\``, () => {
    const values = [[0], [-0], ['0'], ['-0'], [0, 1], [-0, 1], ['0', 1], ['-0', 1]];
    const expected = [Infinity, -Infinity, Infinity, -Infinity, Infinity, -Infinity, Infinity, -Infinity];

    // eslint-disable-next-line prefer-spread
    const actual = values.map(args => 1 / ceil.apply(undefined, args as any));

    expect(actual).toEqual(expected);
  });

  it(`\`ceil\` should handle edge cases`, () => {
    expect(ceil(1.797, 295)).toBe(1.797);
    expect(ceil(1.797, -295)).toBe(1e295);
    expect(ceil(1.792e-295, 295)).toBe(1e-292);
    expect(ceil(1.792e295, -295)).toBe(2e295);
    expect(ceil(1.7976931348623157e308, 292)).toBe(NaN);
    expect(ceil(5e-324, 323)).toBe(1e-292);
    expect(ceil(5e-324, -323)).toBe(0);
  });
});
