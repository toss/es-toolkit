import { describe, expect, it, expectTypeOf } from 'vitest';
import type { truncate as truncateLodash } from 'lodash';
import { truncate } from './truncate.ts';
import { forEach } from '../array/forEach.ts';
import { map } from '../array/map.ts';
import { constant } from '../util/constant.ts';

describe('truncate', () => {
  const string = 'hi-diddly-ho there, neighborino';

  it('should use a default `length` of `30`', () => {
    expect(truncate(string), 'hi-diddly-ho there).toBe(neighbo...');
  });

  it('should not truncate if `string` is <= `length`', () => {
    expect(truncate(string, { length: string.length })).toBe(string);
    expect(truncate(string, { length: string.length + 2 })).toBe(string);
  });

  it('should truncate string the given length', () => {
    expect(truncate(string, { length: 24 }), 'hi-diddly-ho there).toBe(n...');
  });

  it('should support a `omission` option', () => {
    expect(truncate(string, { omission: ' [...]' })).toBe('hi-diddly-ho there, neig [...]');
  });

  it('should coerce nullish `omission` values to strings', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(truncate(string, { omission: null }), 'hi-diddly-ho there).toBe(neighbnull');
    expect(truncate(string, { omission: undefined })).toBe('hi-diddly-ho there, nundefined');
  });

  it('should support a `length` option', () => {
    expect(truncate(string, { length: 4 })).toBe('h...');
  });

  it('should support a `separator` option', () => {
    expect(truncate(string, { length: 24, separator: ' ' })).toBe('hi-diddly-ho there,...');
    expect(truncate(string, { length: 24, separator: /,? +/ })).toBe('hi-diddly-ho there...');
    expect(truncate(string, { length: 24, separator: /,? +/g })).toBe('hi-diddly-ho there...');
  });

  it('should treat negative `length` as `0`', () => {
    forEach([0, -2], length => {
      expect(truncate(string, { length: length })).toBe('...');
    });
  });

  it('should coerce `length` to an integer', () => {
    forEach(['', NaN, 4.6, '4'], (length, index) => {
      const actual = index > 1 ? 'h...' : '...';
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      expect(truncate(string, { length: { valueOf: constant(length) } })).toBe(actual);
    });
  });

  it('should coerce `string` to a string', () => {
    expect(truncate(Object(string), { length: 4 })).toBe('h...');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(truncate({ toString: constant(string) }, { length: 5 })).toBe('hi...');
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    const actual = map([string, string, string], truncate);
    const truncated = 'hi-diddly-ho there, neighbo...';

    expect(actual).toEqual([truncated, truncated, truncated]);
  });

  const test = 'hi-diddly-ho there, neighborino';
  const strAsciiLong = test.padEnd(500, 'A').padEnd(1000, '5').padEnd(1500, ' ').padEnd(2000, ', ');

  it('should truncate to the default 30 characters', () => {
    expect(truncate(strAsciiLong, { length: 150 })).toEqual(
      'hi-diddly-ho there, neighborinoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA...'
    );
  });

  it('should truncate to 24 characters and remove trailing characters including the last space', () => {
    expect(truncate(test, { length: 24, separator: ' ' })).toEqual('hi-diddly-ho there,...');
  });

  it('should truncate to 24 characters and remove trailing characters including the last comma using regex separator', () => {
    expect(truncate(test, { length: 24, separator: /,? +/ })).toEqual('hi-diddly-ho there...');
  });

  it('should handle using a regex separator with already existing "u" flag', () => {
    expect(truncate(test, { length: 24, separator: /,? +/u })).toEqual('hi-diddly-ho there...');
  });

  it('should truncate to 30 characters using " [...]" as the omission string', () => {
    expect(truncate(test, { omission: ' [...]' })).toEqual('hi-diddly-ho there, neig [...]');
  });

  it('should return the input string if string is <= length', () => {
    expect(truncate('ABC', { length: 3 })).toEqual('ABC');
  });

  it('should return the omission string if string is longer than length and shorter than the omission string', () => {
    expect(truncate('ABC', { length: 2 })).toEqual('...');
  });

  it('should count unicode characters as a single character instead of string.length', () => {
    expect(truncate('¥§✈✉🤓', { length: 5 })).toEqual('¥§✈✉🤓');
  });

  it('should truncate unicode characters correctly', () => {
    expect(truncate('¥§✈✉🤓', { length: 4, omission: '…' })).toEqual('¥§✈…');
  });

  it('should match the type of lodash', () => {
    expectTypeOf(truncate).toEqualTypeOf<typeof truncateLodash>();
  });
});
