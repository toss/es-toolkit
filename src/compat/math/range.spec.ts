import { describe, expect, it } from 'vitest';
import { each, map } from '..';
import { range } from './range';
import { falsey } from '../_internal/falsey';

describe('range', () => {
  it(`\`_.range\` should infer the sign of \`step\` when only \`end\` is given`, () => {
    expect(range(4)).toEqual([0, 1, 2, 3]);
    expect(range(-4)).toEqual([0, -1, -2, -3]);
  });

  it(`\`_.range\` should infer the sign of \`step\` when only \`start\` and \`end\` are given`, () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
    expect(range(5, 1)).toEqual([5, 4, 3, 2]);
  });

  it(`\`_.range\` should work with a \`start\`, \`end\`, and \`step\``, () => {
    expect(range(0, -4, -1)).toEqual([0, -1, -2, -3]);
    expect(range(5, 1, -1)).toEqual([5, 4, 3, 2]);
    expect(range(0, 20, 5)).toEqual([0, 5, 10, 15]);
  });

  it(`\`_.range\` should support a \`step\` of \`0\``, () => {
    expect(range(1, 4, 0)).toEqual([1, 1, 1]);
  });

  it(`\`_.range\` should work with a \`step\` larger than \`end\``, () => {
    expect(range(1, 5, 20)).toEqual([1]);
  });

  it(`\`_.range\` should work with a negative \`step\``, () => {
    expect(range(0, -4, -1)).toEqual([0, -1, -2, -3]);
    expect(range(21, 10, -3)).toEqual([21, 18, 15, 12]);
  });

  it(`\`_.range\` should support \`start\` of \`-0\``, () => {
    const actual = range(-0, 1);
    expect(1 / actual[0]).toBe(-Infinity);
  });

  it(`\`_.range\` should treat falsey \`start\` as \`0\``, () => {
    each(falsey, (value, index) => {
      if (index) {
        // @ts-expect-error - invalid arguments
        expect(range(value)).toEqual([]);
        // @ts-expect-error - invalid arguments
        expect(range(value, 1)).toEqual([0]);
      } else {
        // @ts-expect-error - invalid arguments
        expect(range()).toEqual([]);
      }
    });
  });

  it(`\`_.range\` should coerce arguments to finite numbers`, () => {
    // @ts-expect-error - invalid arguments
    const actual = [range('1'), range('0', 1), range(0, 1, '1'), range(NaN), range(NaN, NaN)];

    expect(actual).toEqual([[0], [0], [0], [], []]);
  });

  it(`\`_.range\` should work as an iteratee for methods like \`_.map\``, () => {
    const array = [1, 2, 3];
    const object = { a: 1, b: 2, c: 3 };
    const expected = [[0], [0, 1], [0, 1, 2]];

    each([array, object], collection => {
      const actual = map(collection, range);
      expect(actual).toEqual(expected);
    });
  });
});
