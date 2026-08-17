import { describe, expect, it } from 'vitest';
import { nthArg } from './nthArg';
import { noop } from '../../function';
import { range } from '../../math';
import { falsey } from '../_internal/falsey';
import { stubA } from '../_internal/stubA';
import { stubB } from '../_internal/stubB';

describe('nthArg', () => {
  const args = ['a', 'b', 'c', 'd'];

  it('should create a function that returns its nth argument', () => {
    const actual = args.map((value, index) => {
      const func = nthArg(index);
      return func(...args);
    });

    expect(actual).toEqual(args);
  });

  it('should work with a negative `n`', () => {
    const actual = range(1, args.length + 1).map(n => {
      const func = nthArg(-n);
      return func(...args);
    });

    expect(actual).toEqual(['d', 'c', 'b', 'a']);
  });

  it('should coerce `n` to an integer', () => {
    let values = falsey;
    let expected = values.map(stubA);

    let actual = values.map(n => {
      // @ts-expect-error invalid types
      const func = n ? nthArg(n) : nthArg();
      return func(...args);
    });

    expect(actual).toEqual(expected);

    values = ['1', 1.6];
    expected = values.map(stubB);

    actual = values.map(n => {
      // @ts-expect-error invalid types
      const func = nthArg(n);
      return func(...args);
    });

    expect(actual).toEqual(expected);
  });

  it('should return `undefined` for empty arrays', () => {
    const func = nthArg(1);
    expect(func()).toBe(undefined);
  });

  it('should return `undefined` for non-indexes', () => {
    const values = [Infinity, args.length];
    const expected = values.map(noop);

    const actual = values.map(n => {
      const func = nthArg(n);
      return func(...args);
    });

    expect(actual).toEqual(expected);
  });
});
