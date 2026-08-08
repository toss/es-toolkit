import { describe, expect, it } from 'vitest';
import { random } from './random';
import { uniq } from '../../array/uniq';
import { stubTrue } from '../util/stubTrue';

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
    ).toBe(true);

    expect(array.some(() => random(Number.MAX_SAFE_INTEGER))).toBe(true);
  });

  it('should coerce arguments to finite numbers', () => {
    // eslint-disable-next-line
    // @ts-ignore
    const actual = [random(NaN, NaN), random('1', '1'), random(Infinity, Infinity)];

    expect(actual).toEqual([0, 1, Number.MAX_SAFE_INTEGER]);
  });

  it('should coerce a string upper bound and respect both bounds', () => {
    for (let i = 0; i < 100; i++) {
      // eslint-disable-next-line
      // @ts-ignore
      const actual = random('5', '10');
      expect(actual).toBeGreaterThanOrEqual(5);
      expect(actual).toBeLessThanOrEqual(10);
    }
  });

  it('should support a float `min` or `max`', () => {
    const floatMinSamples = array.map(() => random(1.5, 2));
    expect(floatMinSamples.some(v => v % 1 !== 0)).toBeTruthy();
    expect(floatMinSamples.every(v => v >= 1.5 && v <= 2)).toBeTruthy();

    const floatMaxSamples = array.map(() => random(1, 2.5));
    expect(floatMaxSamples.some(v => v % 1 !== 0)).toBeTruthy();
    expect(floatMaxSamples.every(v => v >= 1 && v <= 2.5)).toBeTruthy();
  });

  it('should support a float `max`', () => {
    const max = 2.5;
    const samples = array.map(() => random(max));

    expect(samples.some(v => v % 1 !== 0)).toBeTruthy();
    expect(samples.every(v => v >= 0 && v <= max)).toBeTruthy();
  });

  it('should support floats', () => {
    const min = 1.5;
    const max = 1.6;
    const actual = random(min, max);

    expect(actual % 1).toBeTruthy();
    expect(actual >= min && actual <= max).toBeTruthy();
  });

  it('should support providing a `floating`', () => {
    let actual = random(true);
    expect(actual % 1 && actual >= 0 && actual <= 1).toBeTruthy();

    actual = random(2, true);
    expect(actual % 1 && actual >= 0 && actual <= 2).toBeTruthy();

    actual = random(2, 4, true);
    expect(actual % 1 && actual >= 2 && actual <= 4).toBeTruthy();
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    const array = [1, 2, 3];
    const expected = array.map(stubTrue);
    const randoms = array.map(random);

    const actual = randoms.map((result, index) => result >= 0 && result <= array[index] && result % 1 === 0);

    expect(actual).toEqual(expected);
  });
});
