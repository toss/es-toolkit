import { describe, expect, it } from 'vitest';
import { pull as pullToolkit } from './pull';

describe('pull', () => {
  const methodName = 'pull';
  const func = pullToolkit;

  function pull(array: any[], values: any[]) {
    // eslint-disable-next-line prefer-spread
    return func.apply(undefined, [array].concat(values) as any);
  }

  it(`\`_.${methodName}\` should modify and return the array`, () => {
    const array = [1, 2, 3];
    const actual = pull(array, [1, 3]);

    expect(actual).toBe(array);
    expect(array).toEqual([2]);
  });

  it(`\`_.${methodName}\` should preserve holes in arrays`, () => {
    const array = [1, 2, 3, 4];
    delete array[1];
    delete array[3];

    pull(array, [1]);
    expect('0' in array).toBe(false);
    expect('2' in array).toBe(false);
  });

  it(`\`_.${methodName}\` should treat holes as \`undefined\``, () => {
    const array = [1, 2, 3];
    delete array[1];

    pull(array, [undefined]);
    expect(array).toEqual([1, 3]);
  });

  it(`\`_.${methodName}\` should match \`NaN\``, () => {
    const array = [1, NaN, 3, NaN];

    pull(array, [NaN]);
    expect(array).toEqual([1, 3]);
  });
});
