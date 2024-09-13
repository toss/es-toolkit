import { describe, expect, it } from 'vitest';
import { findIndex } from './findIndex';
import { slice } from '../_internal/slice';

describe('findIndex', () => {
  const objects = [
    { a: 0, b: 0 },
    { a: 1, b: 1 },
    { a: 2, b: 2 },
  ];

  it(`should return the found value`, () => {
    expect(findIndex(objects, object => object.a)).toEqual(1);
  });

  it(`should return -1 if value is not found`, () => {
    expect(findIndex(objects, object => object.a === 3)).toEqual(-1);
  });

  it(`findIndex should work with \`matches\` shorthands`, () => {
    expect(findIndex(objects, { b: 2 })).toBe(2);
  });

  it(`findIndex should work with \`matchesProperty\` shorthands`, () => {
    expect(findIndex(objects, ['b', 2])).toBe(2);
  });

  it(`findIndex should work with \`property\` shorthands`, () => {
    expect(findIndex(objects, 'b')).toBe(1);
  });

  it(`findIndex should provide correct \`predicate\` arguments for arrays`, () => {
    let args: any;
    const array = ['a'];

    findIndex(array, function () {
      // eslint-disable-next-line
      args || (args = slice.call(arguments));
    });

    expect(args).toEqual(['a', 0, array]);
  });
});
