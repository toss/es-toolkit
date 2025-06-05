import { describe, expect, it } from 'vitest';
import { truncate } from './truncate.ts';

/**
 * Truncates `string` if it's longer than the given maximum string length.
 * The last characters of the truncated string are replaced with the omission
 * string which defaults to "..."
 */

describe('truncate', () => {
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
});
