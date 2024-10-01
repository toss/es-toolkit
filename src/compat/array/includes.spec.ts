import { describe, expect, it } from 'vitest';
import { includes } from './includes';
import { args } from '../_internal/args';
import { empties } from '../_internal/empties';
import { falsey } from '../_internal/falsey';
import { stubFalse } from '../_internal/stubFalse';
import { toArgs } from '../_internal/toArgs';

describe('includes', () => {
  it('should ignore inherited value', () => {
    const obj = Object.create({ inherited: 'value' });
    expect(includes(obj, 'value')).toBe(false);
  });

  Object.entries({
    'an `arguments` object': toArgs([1, 2, 3, 4]),
    'an array': [1, 2, 3, 4],
    'an object': { a: 1, b: 2, c: 3, d: 4 },
    'a string': '1234',
  }).forEach(([key, collection]) => {
    it(`should work with ${key} and  return \`true\` for  matched values`, () => {
      expect(includes(collection, 3)).toBe(true);
    });

    it(`should work with ${key} and  return \`false\` for unmatched values`, () => {
      expect(includes(collection, 5)).toBe(false);
    });

    it(`should work with ${key} and floor \`position\` values`, () => {
      expect(includes(collection, 2, 1.2)).toBe(true);
    });

    // it(`should work with ${key} and return an unwrapped value implicitly when chaining`, () => {
    //   expect(_(collection).includes(3)).toBe(true);
    // });

    // it(`should work with ${key} and return a wrapped value when explicitly chaining`, () => {
    //   expect(_(collection).chain().includes(3) instanceof _);
    // });
  });

  Object.entries({
    literal: 'abc',
    object: Object('abc'),
  }).forEach(([key, collection]) => {
    it(`should work with a string ${key} for \`collection\``, () => {
      expect(includes(collection, 'bc')).toBe(true);
      expect(includes(collection, 'd')).toBe(false);
    });
  });

  it('should return `false` for empty collections', () => {
    const expected = empties.map(stubFalse);

    const actual = empties.map(value => {
      try {
        return includes(value);
      } catch (e) {
        /* empty */
      }
    });

    expect(actual).toEqual(expected);
  });

  it('should work with a string and a `fromIndex` >= `length`', () => {
    const string = '1234';
    const length = string.length;
    const indexes = [4, 6, 2 ** 32, Infinity];

    const expected = indexes.map(index => [false, false, index === length]);

    const actual = indexes.map(fromIndex => [
      includes(string, 1, fromIndex),
      includes(string, undefined, fromIndex),
      includes(string, '', fromIndex),
    ]);

    expect(actual).toEqual(expected);
  });

  it('should match `NaN`', () => {
    expect(includes([1, NaN, 3], NaN)).toBe(true);
    expect(includes({ a: 1, b: NaN, c: 3 }, NaN)).toBe(true);
  });

  it('should match `-0` as `0`', () => {
    expect(includes([-0], 0)).toBe(true);
    expect(includes([0], -0)).toBe(true);
  });

  // it('should work as an iteratee for methods like `_.every`', () => {
  //   const array = [2, 3, 1];
  //   const values = [1, 2, 3];

  //   expect(esToolkit.every(values, esToolkit.partial(includes, array)));
  // });

  const resolve = (x: unknown) => x;

  Object.entries({
    'an `arguments` object': args,
    'an array': [1, 2, 3],
    'a string': '123',
  }).forEach(([key, collection]) => {
    const values = Array.from(collection);

    it(`should work with ${key} and a positive \`fromIndex\``, () => {
      const expected = [true, false];
      const actual = [includes(collection, resolve(values[2]), 2), includes(collection, resolve(values[1]), 2)];

      expect(actual).toEqual(expected);
    });

    it(`should work with ${key} and a \`fromIndex\` >= \`length\``, () => {
      const indexes = [4, 6, 2 ** 32, Infinity];

      const expected = indexes.map(() => {
        const result = false;
        return [result, result, result];
      });

      const actual = indexes.map(fromIndex => [
        includes(collection, resolve(1), fromIndex),
        includes(collection, resolve(undefined), fromIndex),
        includes(collection, resolve(''), fromIndex),
      ]);

      expect(actual).toEqual(expected);
    });

    it(`should work with ${key} and treat falsey \`fromIndex\` values as \`0\``, () => {
      const expected = falsey.map(() => true);

      // eslint-disable-next-line
      // @ts-ignore
      const actual = falsey.map(fromIndex => includes(collection, resolve(values[0]), fromIndex));

      expect(actual).toEqual(expected);
    });

    it(`should work with ${key} and coerce \`fromIndex\` to an integer`, () => {
      const expected = [true, true, false];

      const actual = [
        includes(collection, resolve(values[0]), 0.1),
        includes(collection, resolve(values[0]), NaN),
        // eslint-disable-next-line
        // @ts-ignore
        includes(collection, resolve(values[0]), '1'),
      ];

      expect(actual).toEqual(expected);
    });

    it(`should work with ${key} and a negative \`fromIndex\``, () => {
      const expected = [true, false];

      const actual = [includes(collection, resolve(values[2]), -1), includes(collection, resolve(values[1]), -1)];

      expect(actual).toEqual(expected);
    });

    it(`should work with ${key} and a negative \`fromIndex\` <= \`-length\``, () => {
      const indexes = [-4, -6, -Infinity];
      const expected = indexes.map(() => true);

      const actual = indexes.map(fromIndex => includes(collection, resolve(values[0]), fromIndex));

      expect(actual).toEqual(expected);
    });
  });
});
