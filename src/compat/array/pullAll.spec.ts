import { describe, expect, it } from 'vitest';
import { pullAll } from './pullAll';

describe('pullAll', () => {
  function pull(array: any[], values: any[]) {
    return pullAll(array, values);
  }

  it(`\`_.pullAll\` should modify and return the array`, () => {
    const array = [1, 2, 3];
    const actual = pull(array, [1, 3]);

    expect(actual).toBe(array);
    expect(array).toEqual([2]);
  });

  it(`\`_.pullAll\` should preserve holes in arrays`, () => {
    const array = [1, 2, 3, 4];
    delete array[1];
    delete array[3];

    pull(array, [1]);
    expect('0' in array).toBe(false);
    expect('2' in array).toBe(false);
  });

  it(`\`_.pullAll\` should treat holes as \`undefined\``, () => {
    const array = [1, 2, 3];
    delete array[1];

    pull(array, [undefined]);
    expect(array).toEqual([1, 3]);
  });

  it(`\`_.pullAll\` should match \`NaN\``, () => {
    const array = [1, NaN, 3, NaN];

    pull(array, [NaN]);
    expect(array).toEqual([1, 3]);
  });

  it('should work with the same value for `array` and `values`', () => {
    const array = [{ a: 1 }, { b: 2 }];
    const actual = pullAll(array, array);

    expect(actual).toEqual([]);
  });
});
