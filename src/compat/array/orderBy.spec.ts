import { describe, expect, it } from 'vitest';
import { orderBy } from './orderBy.ts';
import { falsey } from '../_internal/falsey.ts';

describe('orderBy', () => {
  const objects = [
    { a: 'x', b: 3 },
    { a: 'y', b: 4 },
    { a: 'x', b: 1 },
    { a: 'y', b: 2 },
  ];

  const nestedObj = [
    { id: '4', address: { zipCode: 4, streetName: 'Beta' } },
    { id: '3', address: { zipCode: 3, streetName: 'Alpha' } },
    { id: '1', address: { zipCode: 1, streetName: 'Alpha' } },
    { id: '2', address: { zipCode: 2, streetName: 'Alpha' } },
    { id: '5', address: { zipCode: 4, streetName: 'Alpha' } },
  ];

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

  it('should work with `keys` specified as functions', () => {
    expect(orderBy(objects, [item => item.a, item => item.b], ['desc', 'asc'])).toEqual([
      objects[3],
      objects[1],
      objects[2],
      objects[0],
    ]);
  });
});
