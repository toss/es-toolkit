import { describe, expect, it } from 'vitest';
import { findLastIndex } from './findLastIndex';
import { slice } from '../_internal/slice';

describe('findLastIndex', () => {
  const objects = [
    { a: 0, b: 0 },
    { a: 1, b: 1 },
    { a: 2, b: 2 },
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
  });

  it(`findLastIndex should work with \`property\` shorthands`, () => {
    expect(findLastIndex(objects, 'b')).toBe(2);
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
});
