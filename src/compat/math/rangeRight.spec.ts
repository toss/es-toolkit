import { describe, expect, it } from 'vitest';
import { each, map } from '..';
import { rangeRight } from './rangeRight';
import { falsey } from '../_internal/falsey';

describe('rangeRight methods', () => {
  it(`\`_.rangeRightRight\` should infer the sign of \`step\` when only \`end\` is given`, () => {
    expect(rangeRight(4)).toEqual([0, 1, 2, 3].reverse());
    expect(rangeRight(-4)).toEqual([0, -1, -2, -3].reverse());
  });

  it(`\`_.rangeRight\` should infer the sign of \`step\` when only \`start\` and \`end\` are given`, () => {
    expect(rangeRight(1, 5)).toEqual([1, 2, 3, 4].reverse());
    expect(rangeRight(5, 1)).toEqual([5, 4, 3, 2].reverse());
  });

  it(`\`_.rangeRight\` should work with a \`start\`, \`end\`, and \`step\``, () => {
    expect(rangeRight(0, -4, -1)).toEqual([0, -1, -2, -3].reverse());
    expect(rangeRight(5, 1, -1)).toEqual([5, 4, 3, 2].reverse());
    expect(rangeRight(0, 20, 5)).toEqual([0, 5, 10, 15].reverse());
  });

  it(`\`_.rangeRight\` should support a \`step\` of \`0\``, () => {
    expect(rangeRight(1, 4, 0)).toEqual([1, 1, 1].reverse());
  });

  it(`\`_.rangeRight\` should work with a \`step\` larger than \`end\``, () => {
    expect(rangeRight(1, 5, 20)).toEqual([1]);
  });

  it(`\`_.rangeRight\` should work with a negative \`step\``, () => {
    expect(rangeRight(0, -4, -1)).toEqual([0, -1, -2, -3].reverse());
    expect(rangeRight(21, 10, -3)).toEqual([21, 18, 15, 12].reverse());
  });

  it(`\`_.rangeRight\` should support \`start\` of \`-0\``, () => {
    const actual = rangeRight(-0, 1);
    expect(1 / actual[0]).toBe(-Infinity);
  });

  it(`\`_.rangeRight\` should treat falsey \`start\` as \`0\``, () => {
    each(falsey, (value, index) => {
      if (index) {
        // @ts-expect-error - invalid arguments
        expect(rangeRight(value)).toEqual([]);
        // @ts-expect-error - invalid arguments
        expect(rangeRight(value, 1)).toEqual([0]);
      } else {
        // @ts-expect-error - invalid arguments
        expect(rangeRight()).toEqual([]);
      }
    });
  });

  it(`\`_.rangeRight\` should coerce arguments to finite numbers`, () => {
    // @ts-expect-error - invalid arguments
    const actual = [rangeRight('1'), rangeRight('0', 1), rangeRight(0, 1, '1'), rangeRight(NaN), rangeRight(NaN, NaN)];

    expect(actual).toEqual([[0], [0], [0], [], []]);
  });

  it(`\`_.rangeRight\` should work as an iteratee for methods like \`_.map\``, () => {
    const array = [1, 2, 3];
    const object = { a: 1, b: 2, c: 3 };
    const expected = [[0], [0, 1].reverse(), [0, 1, 2].reverse()];

    each([array, object], collection => {
      const actual = map(collection, rangeRight);
      expect(actual).toEqual(expected);
    });
  });
});
