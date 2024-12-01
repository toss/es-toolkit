import { describe, expect, it } from 'vitest';
import { findLastIndex } from './findLastIndex';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';
import { slice } from '../_internal/slice';
import { stubZero } from '../_internal/stubZero';

describe('findLastIndex', () => {
  const objects = [
    { a: 0, b: 0, 0: 0, [Symbol.for('a')]: 0 },
    { a: 1, b: 1, 0: 1, [Symbol.for('a')]: 1 },
    { a: 2, b: 2, 0: 2, [Symbol.for('a')]: 2 },
  ];

  it(`should return the found value`, () => {
    expect(findLastIndex(objects, object => object.a)).toEqual(2);
  });

  it(`should return -1 if value is not found`, () => {
    expect(findLastIndex(objects, object => object.a === 3)).toEqual(-1);
  });

  it(`findLastIndex should work with \`matches\` shorthands`, () => {
    expect(findLastIndex(objects, { b: 2 })).toBe(2);
  });

  it(`findLastIndex should work with \`matchesProperty\` shorthands`, () => {
    expect(findLastIndex(objects, ['b', 2])).toBe(2);
    expect(findLastIndex(objects, [0, 2])).toBe(2);
    expect(findLastIndex(objects, [Symbol.for('a'), 2])).toBe(2);
  });

  it(`findLastIndex should work with \`property\` shorthands`, () => {
    expect(findLastIndex(objects, 'b')).toBe(2);
    expect(findLastIndex(objects, 0)).toBe(2);
    expect(findLastIndex(objects, Symbol.for('a'))).toBe(2);
  });

  it(`findLastIndex should provide correct \`predicate\` arguments for arrays`, () => {
    let args: any;
    const array = ['a'];

    findLastIndex(array, function () {
      // eslint-disable-next-line
      args || (args = slice.call(arguments));
    });

    expect(args).toEqual(['a', 0, array]);
  });

  const array = [1, 2, 3, 1, 2, 3];

  it(`\`findLastIndex\` should return the index of the last matched value`, () => {
    expect(findLastIndex(array, x => x === 3)).toBe(5);
  });

  it(`\`findLastIndex\` should work with a positive \`fromIndex\``, () => {
    expect(findLastIndex(array, x => x === 1, 2)).toBe(0);
  });

  it(`\`findLastIndex\` should work with a \`fromIndex\` >= \`length\``, () => {
    const values = [6, 8, 2 ** 32, Infinity];
    const expected = values.map(() => [-1, 3, -1]);

    const actual = values.map(fromIndex => [
      findLastIndex(array, x => x === undefined, fromIndex),
      findLastIndex(array, x => x === 1, fromIndex),
      // eslint-disable-next-line
      // @ts-ignore
      findLastIndex(array, x => x === '', fromIndex),
    ]);

    expect(actual).toEqual(expected);
  });

  it(`\`findLastIndex\` should work with a negative \`fromIndex\``, () => {
    expect(findLastIndex(array, x => x === 2, -3)).toBe(1);
  });

  it(`\`findLastIndex\` should work with a negative \`fromIndex\` <= \`-length\``, () => {
    const values = [-6, -8, -Infinity];
    const expected = values.map(stubZero);

    const actual = values.map(fromIndex => findLastIndex(array, x => x === 1, fromIndex));

    expect(actual).toEqual(expected);
  });

  it(`\`findLastIndex\` should treat falsey \`fromIndex\` values correctly`, () => {
    const expected = falsey.map(value => (value === undefined ? 5 : -1));

    const actual = falsey.map(fromIndex =>
      // eslint-disable-next-line
      // @ts-ignore
      findLastIndex(array, x => x === 3, fromIndex)
    );

    expect(actual).toEqual(expected);
  });

  it(`\`findLastIndex\` should coerce \`fromIndex\` to an integer`, () => {
    expect(findLastIndex(array, x => x === 2, 4.2)).toBe(4);
  });

  it('should return `-1` when provided `null` or `undefined`', () => {
    expect(findLastIndex(null, 'a')).toBe(-1);
    expect(findLastIndex(undefined, 'a')).toBe(-1);
  });

  it('should support array-like objects', () => {
    expect(findLastIndex({ 0: 'a', 1: 'b', length: 2 }, i => i === 'b')).toBe(1);
    expect(findLastIndex('123', i => i === '2')).toBe(1);
    expect(findLastIndex(args, i => i === 2)).toBe(1);
  });
});
