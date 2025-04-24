import { describe, expect, it } from 'vitest';
import * as lodashStable from 'es-toolkit/compat';
import { findLast } from './findLast';
import { args } from '../_internal/args';
import { empties } from '../_internal/empties';
import { falsey } from '../_internal/falsey';

describe('findLast', () => {
  const func = findLast;

  const objects = [
    { a: 0, b: 0 },
    { a: 1, b: 1 },
    { a: 2, b: 2 },
  ];

  const expected = [objects[2], undefined, objects[2]];

  it(`should return the found value`, () => {
    expect(func(objects, object => object.a)).toEqual(expected[0]);
  });

  it(`should return \`${expected[1]}\` if value is not found`, () => {
    expect(func(objects, object => object.a === 3)).toEqual(expected[1]);
  });

  it(`should work with \`_.matches\` shorthands`, () => {
    expect(func(objects, { b: 2 })).toBe(expected[2]);
  });

  it(`should work with \`_.matchesProperty\` shorthands`, () => {
    expect(func(objects, ['b', 2])).toBe(expected[2]);
  });

  it(`should work with \`_.property\` shorthands`, () => {
    expect(func(objects, 'b')).toBe(expected[0]);
  });

  it(`should return \`${expected[1]}\` for empty collections`, () => {
    const emptyValues = empties;
    const expecting = lodashStable.map(emptyValues, lodashStable.constant(expected[1]));

    const actual = lodashStable.map(emptyValues, value => {
      try {
        return func(value, { a: 3 } as any);
      } catch (e) {
        //
      }
    });

    expect(actual).toEqual(expecting);
  });

  it(`should provide correct \`predicate\` arguments for arrays`, () => {
    let args: any;
    const array = ['a'];

    func(array, function () {
      // eslint-disable-next-line
      args || (args = Array.prototype.slice.call(arguments));
    });

    expect(args).toEqual(['a', 0, array]);
  });

  it(`should work with an object for \`collection\``, () => {
    const actual = findLast({ a: 1, b: 2, c: 3 }, n => n < 3);

    const expected = 2;

    expect(actual).toBe(expected);
  });

  it(`should provide correct \`predicate\` arguments for objects`, () => {
    let args: any;
    const object = { a: 1 };

    findLast(object, function () {
      // eslint-disable-next-line
      args || (args = Array.prototype.slice.call(arguments));
    });

    expect(args).toEqual([1, 'a', object]);
  });

  const resolve = lodashStable.curry(lodashStable.eq);

  lodashStable.each(
    {
      'an `arguments` object': args,
      'an array': [1, 2, 3],
    },
    (collection, key) => {
      const values = lodashStable.toArray(collection);

      it(`should work with ${key} and a positive \`fromIndex\``, () => {
        const expected = [values[1], undefined];

        const actual = [findLast(collection, resolve(values[1]), 1), findLast(collection, resolve(values[2]), 1)];

        expect(actual).toEqual(expected);
      });

      it(`should work with ${key} and a \`fromIndex\` >= \`length\``, () => {
        const indexes = [4, 6, 2 ** 32, Infinity];

        const expected = lodashStable.map(indexes, lodashStable.constant([values[0], undefined, undefined]));

        const actual = lodashStable.map(indexes, fromIndex => [
          findLast(collection, resolve(1), fromIndex),
          findLast(collection, resolve(undefined), fromIndex),
          findLast(collection, resolve(''), fromIndex),
        ]);

        expect(actual).toEqual(expected);
      });

      it(`should work with ${key} and treat falsey \`fromIndex\` values correctly`, () => {
        const expected = lodashStable.map(falsey, value => (value === undefined ? values[3] : undefined));

        const actual = lodashStable.map(falsey, fromIndex =>
          findLast(collection as any, resolve(values[3]), fromIndex as any)
        );

        expect(actual).toEqual(expected);
      });

      it(`should work with ${key} and coerce \`fromIndex\` to an integer`, () => {
        const expected = [values[0], values[0], undefined];

        const actual = [
          findLast(collection, resolve(values[0]), 0.1),
          findLast(collection, resolve(values[0]), NaN),
          findLast(collection, resolve(values[2]), '1' as any),
        ];

        expect(actual).toEqual(expected);
      });

      it(`should work with ${key} and a negative \`fromIndex\``, () => {
        const expected = [values[1], undefined];

        const actual = [findLast(collection, resolve(values[1]), -2), findLast(collection, resolve(values[2]), -2)];

        expect(actual).toEqual(expected);
      });

      it(`should work with ${key} and a negative \`fromIndex\` <= \`-length\``, () => {
        const indexes = [-4, -6, -Infinity];
        const expected = lodashStable.map(indexes, lodashStable.constant(values[0]));

        const actual = lodashStable.map(indexes, fromIndex => findLast(collection, resolve(values[0]), fromIndex));

        expect(actual).toEqual(expected);
      });
    }
  );
});
