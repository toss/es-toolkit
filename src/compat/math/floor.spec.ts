import { describe, expect, it } from 'vitest';
import { floor } from './floor';

describe('floor', () => {
  it(`\`floor\` should return a rounded number without a precision`, () => {
    const actual = floor(4.006);
    expect(actual).toBe(4);
  });

  it(`\`floor\` should work with a precision of \`0\``, () => {
    const actual = floor(4.006, 0);
    expect(actual).toBe(4);
  });

  it(`\`floor\` should work with a positive precision`, () => {
    let actual = floor(4.016, 2);
    expect(actual).toBe(4.01);

    actual = floor(4.1, 2);
    expect(actual).toBe(4.1);

    actual = floor(4.4, 2);
    expect(actual).toBe(4.4);
  });

  it(`\`floor\` should work with a negative precision`, () => {
    const actual = floor(4160, -2);
    expect(actual).toBe(4100);
  });

  it(`\`floor\` should coerce \`precision\` to an integer`, () => {
    let actual = floor(4.006, NaN);
    expect(actual).toBe(4);

    const expected = 4.01;

    actual = floor(4.016, 2.6);
    expect(actual).toBe(expected);

    actual = floor(4.016, '+2');
    expect(actual).toBe(expected);
  });

  it(`\`floor\` should work with exponential notation and \`precision\``, () => {
    let actual = floor(5e1, 2);
    expect(actual).toEqual(50);

    actual = floor('5e', 1);
    expect(actual).toEqual(NaN);

    actual = floor('5e1e1', 1);
    expect(actual).toEqual(NaN);
  });

  it(`\`floor\` should preserve the sign of \`0\``, () => {
    const values = [[0], [-0], ['0'], ['-0'], [0, 1], [-0, 1], ['0', 1], ['-0', 1]];
    const expected = [Infinity, -Infinity, Infinity, -Infinity, Infinity, -Infinity, Infinity, -Infinity];

    // eslint-disable-next-line prefer-spread
    const actual = values.map(args => 1 / floor.apply(undefined, args as any));

    expect(actual).toEqual(expected);
  });

  it(`\`floor\` should handle edge cases`, () => {
    expect(floor(1.797, 295)).toBe(1.797);
    expect(floor(1.797, -295)).toBe(0);
    expect(floor(1.792e-295, 295)).toBe(0);
    expect(floor(1.792e295, -295)).toBe(1e295);
    expect(floor(1.7976931348623157e308, 292)).toBe(NaN);
    expect(floor(5e-324, 323)).toBe(0);
    expect(floor(5e-324, -323)).toBe(0);
  });
});
