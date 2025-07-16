import { describe, expect, expectTypeOf, it } from 'vitest';
import type { zip as zipLodash } from 'lodash';
import { zip } from './zip';
import { unzip } from '../../array/unzip';
import { falsey } from '../_internal/falsey';
import { stubArray } from '../util/stubArray';

describe('zip', () => {
  const object = {
    'an empty array': [[], []],
    '0-tuples': [[[], []], []],
    '2-tuples': [
      [
        ['barney', 'fred'],
        [36, 40],
      ],
      [
        ['barney', 36],
        ['fred', 40],
      ],
    ],
    '3-tuples': [
      [
        ['barney', 'fred'],
        [36, 40],
        [false, true],
      ],
      [
        ['barney', 36, false],
        ['fred', 40, true],
      ],
    ],
  };

  Object.entries(object).forEach(([key, pair]) => {
    it(`\`_.zip\` should work with ${key}`, () => {
      const actual = zip(...pair[0]);
      expect(actual).toEqual(pair[1]);
    });
  });

  it(`\`_.zip\` should work with tuples of different lengths`, () => {
    const pair = [
      [
        ['barney', 36],
        ['fred', 40, false],
      ],
      [
        ['barney', 'fred'],
        [36, 40],
        [undefined, false],
      ],
    ];

    let actual = zip(...pair[0]);
    expect('0' in actual[2]).toBeTruthy();
    expect(actual).toEqual(pair[1]);

    actual = unzip(actual) as any;
    expect('2' in actual[0]).toBeTruthy();
    expect(actual).toEqual([
      ['barney', 36, undefined],
      ['fred', 40, false],
    ]);
  });

  it(`\`_.zip\` should treat falsey values as empty arrays`, () => {
    const expected = falsey.map(stubArray);

    // @ts-expect-error - unknown type
    const actual = falsey.map(value => zip(value, value, value));

    expect(actual).toEqual(expected);
  });

  it(`\`_.zip\` should ignore values that are not arrays or \`arguments\` objects`, () => {
    const array = [[1, 2], [3, 4], null, undefined, { 0: 1 }];
    // @ts-expect-error - TS doesn't support array types with a spread operator
    expect(zip(...array)).toEqual([
      [1, 3],
      [2, 4],
    ]);
  });

  it(`\`_.zip\` should support consuming its return value`, () => {
    const expected: any[][] = [
      ['barney', 'fred'],
      [36, 40],
    ];

    expect(unzip(zip(...unzip(zip(...expected))))).toEqual(expected);
  });

  it(`\`_.zip\` should work with array-like object`, () => {
    const array = { 0: 'a', 1: 'b', length: 2 };
    expect(zip(array)).toEqual([['a'], ['b']]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(zip).toEqualTypeOf<typeof zipLodash>();
  });
});
