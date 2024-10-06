import { describe, expect, it } from 'vitest';
import { dropRightWhile } from './dropRightWhile';
import { slice } from '../_internal/slice';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/dropRightWhile.spec.js
 */
describe('dropRightWhile', () => {
  const array = [1, 2, 3, 4];

  const objects = [
    { a: 0, b: 0 },
    { a: 1, b: 1 },
    { a: 2, b: 2 },
  ];

  it('should drop elements while `predicate` returns truthy', function () {
    const actual = dropRightWhile(array, function (n) {
      return n > 2;
    });

    expect(actual).toEqual([1, 2]);
  });

  it('should provide correct `predicate` arguments', function () {
    let args;

    dropRightWhile(array, function () {
      // eslint-disable-next-line prefer-rest-params
      args = slice.call(arguments);
    });

    expect(args).toEqual([4, 3, array]);
  });

  it('should work with `_.matches` shorthands', function () {
    expect(dropRightWhile(objects, { b: 2 })).toEqual(objects.slice(0, 2));
  });

  it('should work with `_.matchesProperty` shorthands', function () {
    expect(dropRightWhile(objects, ['b', 2])).toEqual(objects.slice(0, 2));
  });

  it('should work with `_.property` shorthands', function () {
    expect(dropRightWhile(objects, 'b')).toEqual(objects.slice(0, 1));
  });
});
