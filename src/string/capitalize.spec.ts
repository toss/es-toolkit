import { describe, expect, it } from 'vitest';
import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('should converts the first character of string to upper case', () => {
    expect(capitalize('fred')).toEqual('Fred');
  });

  it('should converts the first character of string to upper case and the remaining to lower case.', () => {
    expect(capitalize('FRED')).toEqual('Fred');
  });

  it('should handle special characters correctly', () => {
    expect(capitalize('special@characters!')).toEqual('Special@characters!');
  });

  it('should handle hyphen correctly', () => {
    expect(capitalize('hyphen-text')).toEqual('Hyphen-text');
  });

  it('should handle leading whitespace', () => {
    expect(capitalize(' fred')).toEqual(' fred');
  });

  it('should handle strings that are already in capitalize', () => {
    expect(capitalize('Fred')).toEqual('Fred');
  });

  it('should work with an empty string', () => {
    expect(capitalize('')).toEqual('');
  });
});
