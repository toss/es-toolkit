import { describe, expect, it } from 'vitest';
import { find } from './find';
import { args } from '../_internal/args';
import { empties } from '../_internal/empties';
import { slice } from '../_internal/slice';

describe('find', () => {
  const objects = [
    { a: 0, b: 0, 0: 0, [Symbol.for('a')]: 0 },
    { a: 1, b: 1, 0: 1, [Symbol.for('a')]: 1 },
    { a: 2, b: 2, 0: 2, [Symbol.for('a')]: 2 },
  ];

  it(`should return the found value`, () => {
    expect(find(objects, object => object.a)).toEqual(objects[1]);
  });

  it(`should return undefined if value is not found`, () => {
    expect(find(objects, object => object.a === 3)).toEqual(undefined);
  });

  it(`find should work with \`matches\` shorthands`, () => {
    expect(find(objects, { b: 2 })).toBe(objects[2]);
  });

  it(`find should work with \`matchesProperty\` shorthands`, () => {
    expect(find(objects, ['b', 2])).toBe(objects[2]);
    expect(find(objects, [0, 2])).toBe(objects[2]);
    expect(find(objects, [Symbol.for('a'), 2])).toBe(objects[2]);
  });

  it(`find should work with \`property\` shorthands`, () => {
    expect(find(objects, 'b')).toBe(objects[1]);
    expect(find(objects, 0)).toBe(objects[1]);
    expect(find(objects, Symbol.for('a'))).toBe(objects[1]);
  });

  it(`find should return undefined for empty collections`, () => {
    const emptyValues = empties;
    const expecting = emptyValues.map(() => undefined);

    const actual = emptyValues.map(value => {
      try {
        // eslint-disable-next-line
        // @ts-ignore
        return find(value, { a: 3 });
        // eslint-disable-next-line
      } catch (e) {}
    });

    expect(actual).toEqual(expecting);
  });

  it(`find should provide correct \`predicate\` arguments for arrays`, () => {
    let args: any;
    const array = ['a'];

    find(array, function () {
      // eslint-disable-next-line
      args || (args = slice.call(arguments));
    });

    expect(args).toEqual(['a', 0, array]);
  });

  it(`find should work with an object for \`collection\``, () => {
    const actual = find({ a: 1, b: 2, c: 3 }, n => n < 3);

    expect(actual).toBe(1);
  });

  it(`find should provide correct \`predicate\` arguments for objects`, () => {
    let args: any;
    const object = { a: 1 };

    find(object, function () {
      // eslint-disable-next-line
      args || (args = slice.call(arguments));
    });

    expect(args).toEqual([1, 'a', object]);
  });

  it('find should support fromIndex', () => {
    expect(find(objects, { b: 2 }, -1)).toBe(objects[2]);
    expect(find(objects, { b: 2 }, 0)).toBe(objects[2]);
    expect(find(objects, { b: 2 }, 1)).toBe(objects[2]);
    expect(find(objects, { b: 2 }, 2)).toBe(objects[2]);
    expect(find(objects, { b: 2 }, 3)).toBe(undefined);
    expect(find(objects, { b: 2 }, 4)).toBe(undefined);
  });

  it('should return `undefined` when provided `null` or `undefined`', () => {
    expect(find(null, 'a')).toBe(undefined);
    expect(find(undefined, 'a')).toBe(undefined);
  });

  it('should return `undefined` when provided none array-like object', () => {
    // @ts-expect-error - invalid argument
    expect(find(1, 'a')).toBe(undefined);
    // @ts-expect-error - invalid argument
    expect(find(true, 'a')).toBe(undefined);
  });

  it('should support array-like objects', () => {
    expect(find({ 0: 1, 1: 2, 2: 3, length: 3 }, i => i === 3)).toBe(3);
    expect(find('123', i => i === '3')).toBe('3');
    expect(find(args, i => i === 3)).toBe(3);
  });
});
