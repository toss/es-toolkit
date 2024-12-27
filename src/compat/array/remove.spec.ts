import { describe, expect, it } from 'vitest';
import { remove } from './remove';

const isEven = function (n: number) {
  return n % 2 == 0;
};

describe('remove', () => {
  it('should modify the array and return removed elements', () => {
    const array = [1, 2, 3, 4];
    const actual = remove(array, isEven);

    expect(array).toEqual([1, 3]);
    expect(actual).toEqual([2, 4]);
  });

  it('should provide correct `predicate` arguments', () => {
    const argsList: any[] = [];
    const array = [1, 2, 3];
    const clone = array.slice();

    remove(array, function (n, index) {
      const args = Array.prototype.slice.call(arguments);
      args[2] = args[2].slice();
      argsList.push(args);
      return isEven(index);
    });

    expect(argsList).toEqual([
      [1, 0, clone],
      [2, 1, clone],
      [3, 2, clone],
    ]);
  });

  it('should work with `_.matches` shorthands', () => {
    const objects = [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
    ];
    remove(objects, { a: 1 });
    expect(objects).toEqual([{ a: 0, b: 1 }]);
  });

  it('should work with `_.matchesProperty` shorthands', () => {
    const objects = [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
    ];
    remove(objects, ['a', 1]);
    expect(objects).toEqual([{ a: 0, b: 1 }]);
  });

  it('should work with `_.property` shorthands', () => {
    const objects = [{ a: 0 }, { a: 1 }];
    remove(objects, 'a');
    expect(objects).toEqual([{ a: 0 }]);
  });

  it('should preserve holes in arrays', () => {
    const array = [1, 2, 3, 4];
    delete array[1];
    delete array[3];

    remove(array, n => n === 1);

    expect('0' in array).toBe(false);
    expect('2' in array).toBe(false);
  });

  it('should treat holes as `undefined`', () => {
    const array = [1, 2, 3];
    delete array[1];

    remove(array, n => n == null);

    expect(array).toEqual([1, 3]);
  });

  it('should not mutate the array until all elements to remove are determined', () => {
    const array = [1, 2, 3];

    remove(array, (n, index) => isEven(index));

    expect(array).toEqual([2]);
  });
});
