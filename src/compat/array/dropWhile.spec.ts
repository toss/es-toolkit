import { describe, expect, it } from 'vitest';
import { dropWhile } from './dropWhile';
import { slice } from '../_internal/slice';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/dropWhile.spec.js
 */
describe('dropWhile', () => {
  const array = [1, 2, 3, 4];

  const objects = [
    { a: 2, b: 2 },
    { a: 1, b: 1 },
    { a: 0, b: 0 },
  ];

  it('should drop elements while `predicate` returns truthy', function () {
    const actual = dropWhile(array, function (n) {
      return n < 3;
    });

    expect(actual).toEqual([3, 4]);
  });

  it('should provide correct `predicate` arguments', function () {
    let args;

    dropWhile(array, function () {
      // eslint-disable-next-line prefer-rest-params
      args = slice.call(arguments);
    });

    expect(args).toEqual([1, 0, array]);
  });

  it('should work with `_.matches` shorthands', function () {
    expect(dropWhile(objects, { b: 2 })).toEqual(objects.slice(1));
  });

  it('should work with `_.matchesProperty` shorthands', function () {
    expect(dropWhile(objects, ['b', 2])).toEqual(objects.slice(1));
  });

  it('should work with `_.property` shorthands', function () {
    expect(dropWhile(objects, 'b')).toEqual(objects.slice(2));
  });
});
