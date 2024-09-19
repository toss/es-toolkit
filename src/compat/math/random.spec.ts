import { uniq } from '../../array/uniq';
import { stubTrue } from '../_internal/stubTrue';
import { random } from './random';
import { describe, expect, it } from 'vitest';

describe('random', () => {
  const array = Array.from({ length: 100 });

  it('should return `0` or `1` when no arguments are given', () => {
    const actual = uniq(array.map(() => random())).sort();

    expect(actual).toEqual([0, 1]);
  });

  it('should support a `min` and `max`', () => {
    const min = 5;
    const max = 10;

    expect(
      array.some(() => {
        const result = random(min, max);
        return result >= min && result <= max;
      })
    ).toBeTruthy();
  });

  it('should support not providing a `max`', () => {
    const min = 0;
    const max = 5;

    expect(
      array.some(() => {
        const result = random(max);
        return result >= min && result <= max;
      })
    ).toBeTruthy();
  });

  it('should swap `min` and `max` when `min` > `max`', () => {
    const min = 4;
    const max = 2;
    const expected = [2, 3, 4];

    const actual = uniq(array.map(() => random(min, max))).sort();

    expect(actual).toEqual(expected);
  });

  it('should support large integer values', () => {
    const min = 2 ** 31;
    const max = 2 ** 62;

    expect(
      array.every(() => {
        const result = random(min, max);
        return result >= min && result <= max;
      })
    ).toBeTruthy();

    expect(array.some(() => random(Number.MAX_SAFE_INTEGER)));
  });

  it('should coerce arguments to finite numbers', () => {
    // eslint-disable-next-line
    // @ts-ignore
    const actual = [random(NaN, NaN), random('1', '1'), random(Infinity, Infinity)];

    expect(actual).toEqual([0, 1, Number.MAX_SAFE_INTEGER]);
  });

  it('should support floats', () => {
    const min = 1.5;
    const max = 1.6;
    const actual = random(min, max);

    expect(actual % 1);
    expect(actual >= min && actual <= max);
  });

  it('should support providing a `floating`', () => {
    let actual = random(true);
    expect(actual % 1 && actual >= 0 && actual <= 1);

    actual = random(2, true);
    expect(actual % 1 && actual >= 0 && actual <= 2);

    actual = random(2, 4, true);
    expect(actual % 1 && actual >= 2 && actual <= 4);
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    const array = [1, 2, 3];
    const expected = array.map(stubTrue);
    const randoms = array.map(random);

    console.log(randoms);

    const actual = randoms.map((result, index) => result >= 0 && result <= array[index] && result % 1 === 0);

    expect(actual).toEqual(expected);
  });
});
