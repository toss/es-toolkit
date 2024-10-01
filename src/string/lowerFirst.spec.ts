import { describe, expect, it } from 'vitest';
import { lowerFirst } from './lowerFirst';

describe('lowerFirst', () => {
  it('should change first character of upper case to lower case', () => {
    expect(lowerFirst('Fred')).toEqual('fred');
  });

  it('should keep first character of lower case unaltered', () => {
    expect(lowerFirst('fred')).toEqual('fred');
  });

  it('should keep all other characters unaltered', () => {
    expect(lowerFirst('FRED')).toEqual('fRED');
  });

  it('should work with an empty string', () => {
    expect(lowerFirst('')).toEqual('');
  });

  it('should keep white space and not alter string', () => {
    expect(lowerFirst('  fred')).toEqual('  fred');
  });
});
