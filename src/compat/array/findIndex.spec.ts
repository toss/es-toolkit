import { describe, expect, it, expectTypeOf } from 'vitest';
import type { findIndex as findIndexLodash } from 'lodash';
import { findIndex } from './findIndex';
import { args } from '../_internal/args';
import { slice } from '../_internal/slice';

describe('findIndex', () => {
  const objects = [
    { a: 0, b: 0, 0: 0, [Symbol.for('a')]: 0 },
    { a: 1, b: 1, 0: 1, [Symbol.for('a')]: 1 },
    { a: 2, b: 2, 0: 2, [Symbol.for('a')]: 2 },
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
    expect(findIndex(objects, [0, 2])).toBe(2);
    expect(findIndex(objects, [Symbol.for('a'), 2])).toBe(2);
  });

  it(`findIndex should work with \`property\` shorthands`, () => {
    expect(findIndex(objects, 'b')).toBe(1);
    expect(findIndex(objects, 0)).toBe(1);
    expect(findIndex(objects, Symbol.for('a'))).toBe(1);
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

  it('findIndex should support fromIndex', () => {
    expect(findIndex(objects, { b: 2 }, -1)).toBe(2);
    expect(findIndex(objects, { b: 2 }, 0)).toBe(2);
    expect(findIndex(objects, { b: 2 }, 1)).toBe(2);
    expect(findIndex(objects, { b: 2 }, 2)).toBe(2);
    expect(findIndex(objects, { b: 2 }, 3)).toBe(-1);
    expect(findIndex(objects, { b: 2 }, 4)).toBe(-1);
  });

  it('should return `-1` when provided `null` or `undefined`', () => {
    expect(findIndex(null, 'a')).toBe(-1);
    expect(findIndex(undefined, 'a')).toBe(-1);
  });

  it('should support array-like objects', () => {
    expect(findIndex({ 0: 'a', 1: 'b', length: 2 }, i => i === 'b')).toBe(1);
    expect(findIndex('123', i => i === '2')).toBe(1);
    expect(findIndex(args, i => i === 2)).toBe(1);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(findIndex).toEqualTypeOf<typeof findIndexLodash>();
  });
});
