import { describe, expect, expectTypeOf, it } from 'vitest';
import { toPairs, unzip } from 'es-toolkit/compat';
import { zip } from 'es-toolkit/compat';
import type { unzip as unzipLodash } from 'lodash';

describe('unzip', () => {
  const object = {
    'an empty array': [[], []],
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

  toPairs(object).forEach(([key, pair]) => {
    it(`\`_.unzip\` should work with ${key}`, () => {
      const actual = unzip(pair[1]);
      expect(actual).toEqual(pair[0]);
    });
  });

  it(`\`_.unzip\` should work with tuples of different lengths`, () => {
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
    const actual = unzip(pair[1]) as any;
    expect('2' in actual[0]).toBeTruthy();
    expect(actual).toEqual([
      ['barney', 36, undefined],
      ['fred', 40, false],
    ]);
  });

  it(`\`_.unzip\` should support consuming its return value`, () => {
    const expected = [
      ['barney', 'fred'],
      [36, 40],
    ];
    // @ts-expect-error - TS doesn't support array types in rest parameters
    expect(unzip(zip(...unzip(zip(...expected))))).toEqual(expected);
  });

  it(`\`_.unzip\` should work with array-like object`, () => {
    const array = { 0: { 0: 'a', 1: 1, length: 2 }, 1: { 0: 'b', 1: 2, length: 2 }, length: 2 };
    const actual = unzip(array);
    expect(actual).toEqual([
      ['a', 'b'],
      [1, 2],
    ]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(unzip).toEqualTypeOf<typeof unzipLodash>();
  });
});
