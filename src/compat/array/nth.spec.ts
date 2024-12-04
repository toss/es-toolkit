import { describe, expect, it } from 'vitest';
import { nth } from './nth';
import { noop } from '../../function';
import { range } from '../../math';
import { falsey } from '../_internal/falsey';
import { stubA } from '../_internal/stubA';
import { stubB } from '../_internal/stubB';

describe('nth', () => {
  const array = ['a', 'b', 'c', 'd'];

  it('should get the nth element of `array`', () => {
    const actual = array.map((value, index) => nth(array, index));

    expect(actual).toEqual(array);
  });

  it('should work with a negative `n`', () => {
    const actual = range(1, array.length + 1).map(n => nth(array, -n));

    expect(actual).toEqual(['d', 'c', 'b', 'a']);
  });

  it('should coerce `n` to an integer', () => {
    let values = falsey;
    let expected = values.map(stubA);

    // @ts-expect-error
    let actual = values.map(n => (n ? nth(array, n) : nth(array)));

    expect(actual).toEqual(expected);

    values = ['1', 1.6];
    expected = values.map(stubB);

    // @ts-expect-error
    actual = values.map(n => nth(array, n));

    expect(actual).toEqual(expected);
  });

  it('should return `undefined` for empty arrays', () => {
    const values = [null, undefined, []];
    const expected = values.map(noop);

    const actual = values.map(array => nth(array, 1));

    expect(actual).toEqual(expected);
  });

  it('should return `undefined` for non-indexes', () => {
    const array = [1, 2];
    const values = [Infinity, array.length];
    const expected = values.map(noop);

    array[-1] = 3;

    const actual = values.map(n => nth(array, n));

    expect(actual).toEqual(expected);
  });
});
