import { describe, expect, it } from 'vitest';
import { orderBy } from './orderBy.ts';
import { falsey } from '../_internal/falsey.ts';
import { zipObject } from '../../array/zipObject.ts';
import { partialRight } from '../../function/partialRight.ts';

describe('orderBy', () => {
  class Pair {
    constructor(
      public a: number | undefined,
      public b: number,
      public c: number
    ) {
      this.a = a;
      this.b = b;
      this.c = c;
    }
  }
  const objects = [
    { a: 'x', b: 3 },
    { a: 'y', b: 4 },
    { a: 'x', b: 1 },
    { a: 'y', b: 2 },
  ];

  const stableArray = [
    new Pair(1, 1, 1),
    new Pair(1, 2, 1),
    new Pair(1, 1, 1),
    new Pair(1, 2, 1),
    new Pair(1, 3, 1),
    new Pair(1, 4, 1),
    new Pair(1, 5, 1),
    new Pair(1, 6, 1),
    new Pair(2, 1, 2),
    new Pair(2, 2, 2),
    new Pair(2, 3, 2),
    new Pair(2, 4, 2),
    new Pair(2, 5, 2),
    new Pair(2, 6, 2),
    new Pair(undefined, 1, 1),
    new Pair(undefined, 2, 1),
    new Pair(undefined, 3, 1),
    new Pair(undefined, 4, 1),
    new Pair(undefined, 5, 1),
    new Pair(undefined, 6, 1),
  ];

  const stableObject = zipObject('abcdefghijklmnopqrst'.split(''), stableArray);

  const nestedObj = [
    { id: '4', address: { zipCode: 4, streetName: 'Beta' } },
    { id: '3', address: { zipCode: 3, streetName: 'Alpha' } },
    { id: '1', address: { zipCode: 1, streetName: 'Alpha' } },
    { id: '2', address: { zipCode: 2, streetName: 'Alpha' } },
    { id: '5', address: { zipCode: 4, streetName: 'Alpha' } },
  ];

  it(`should sort multiple properties in ascending order`, () => {
    const actual = orderBy(objects, ['a', 'b']);
    expect(actual).toEqual([objects[2], objects[0], objects[3], objects[1]]);
  });

  it(`should support iteratees`, () => {
    const actual = orderBy(objects, [
      'a',
      function (object) {
        return object.b;
      },
    ]);
    expect(actual).toEqual([objects[2], objects[0], objects[3], objects[1]]);
  });

  it(`should perform a stable sort (test in IE > 8 and V8)`, () => {
    expect(orderBy(stableArray, ['a', 'c'])).toEqual(stableArray);
    expect(orderBy(stableObject, ['a', 'c'])).toEqual(stableArray);
  });

  it(`should not error on nullish elements`, () => {
    let actual;
    try {
      actual = orderBy([...objects, null, undefined], ['a', 'b']);
    } catch {
      // do nothing
    }

    expect(actual).toEqual([objects[2], objects[0], objects[3], objects[1], null, undefined]);
  });

  it(`should work as an iteratee for methods like \`_.reduce\``, () => {
    const objects = [
      { a: 'x', 0: 3 },
      { a: 'y', 0: 4 },
      { a: 'x', 0: 1 },
      { a: 'y', 0: 2 },
    ];

    expect(['a'].reduce(orderBy, objects)).toEqual([objects[0], objects[2], objects[1], objects[3]]);
    expect([0].reduce(orderBy, objects)).toEqual([objects[2], objects[3], objects[0], objects[1]]);
    expect([[0]].reduce(orderBy, objects)).toEqual([objects[2], objects[3], objects[0], objects[1]]);

    const wrapped = partialRight(orderBy, 'bogus');

    expect(['a'].reduce(wrapped, objects)).toEqual([objects[0], objects[2], objects[1], objects[3]]);
    expect([0].reduce(wrapped, objects)).toEqual([objects[2], objects[3], objects[0], objects[1]]);
    expect([[0]].reduce(wrapped, objects)).toEqual([objects[2], objects[3], objects[0], objects[1]]);
  });

  it('should return an empty array when the collection is null or undefined', () => {
    const actual = [null, undefined].map(value => orderBy(value));
    const expected = [[], []];

    expect(actual).toEqual(expected);
  });

  it('should return a shallow copy of the collection when no keys are provided', () => {
    const actual = orderBy(objects);
    const expected = objects.slice();

    expect(actual).toEqual(expected);
  });

  it('should return ascending ordered collection when no orders are provided', () => {
    const actual = orderBy(objects, ['a']);
    const expected = orderBy(objects, ['a'], ['asc']);

    expect(actual).toEqual(expected);
  });

  it('should sort by a single property by a specified order', () => {
    const actual = orderBy(objects, 'a', 'desc');
    const expected = [objects[1], objects[3], objects[0], objects[2]];

    expect(actual).toEqual(expected);
  });

  it('should sort by nested key in array format', () => {
    const actual = orderBy(nestedObj, [['address', 'zipCode'], ['address.streetName']], ['asc', 'desc']);
    const expected = [nestedObj[2], nestedObj[3], nestedObj[1], nestedObj[0], nestedObj[4]];

    expect(actual).toEqual(expected);
  });

  it('should sort by multiple properties by specified orders', () => {
    const actual = orderBy(objects, ['a', 'b'], ['desc', 'asc']);
    const expected = [objects[3], objects[1], objects[2], objects[0]];

    expect(actual).toEqual(expected);
  });

  it('should sort by a property in ascending order when its order is not specified', () => {
    const actual = orderBy(objects, ['a', 'b']);
    const expected = [objects[2], objects[0], objects[3], objects[1]];

    expect(actual).toEqual(expected);
  });

  it('should sort by a property in ascending order when its order is not specified and the collection is falsey', () => {
    const actual = falsey.map((order, index) => orderBy(objects, ['a', 'b'], index ? ['desc', order] : ['desc']));
    const expected = falsey.map(() => [objects[3], objects[1], objects[2], objects[0]]);

    expect(actual).toEqual(expected);
  });

  it('should work with `orders` specified as string objects', () => {
    const actual = orderBy(objects, ['a'], [Object('desc')]);
    const expected = [objects[1], objects[3], objects[0], objects[2]];

    expect(actual).toEqual(expected);
  });

  it('should work with `deep` property paths', () => {
    const actual = orderBy(nestedObj, ['address.zipCode'], ['asc']);
    const expected = [nestedObj[2], nestedObj[3], nestedObj[1], nestedObj[0], nestedObj[4]];

    expect(actual).toEqual(expected);
  });

  it('should work with nested `deep` property paths when paths length is 1', () => {
    const actual = orderBy(nestedObj, [['address.zipCode']], ['asc']);
    const expected = [nestedObj[2], nestedObj[3], nestedObj[1], nestedObj[0], nestedObj[4]];

    expect(actual).toEqual(expected);
  });

  it('shoud work with `deep-like` property paths', () => {
    const objects = [{ 'a.b': 1 }, { 'a.b': 2 }, { 'a.b': 3 }, { 'a.b': 4 }];
    const actual = orderBy(objects, ['a.b'], ['desc']);
    const expected = [objects[3], objects[2], objects[1], objects[0]];

    expect(actual).toEqual(expected);
  });
});
