import { describe, expect, it } from 'vitest';
import { upperFirst } from './upperFirst';

describe('upperFirst', () => {
  it('should change first character of lower case to upper case', () => {
    expect(upperFirst('fred')).toEqual('Fred');
  });

  it('should keep first character of upper case unaltered', () => {
    expect(upperFirst('Fred')).toEqual('Fred');
  });

  it('should keep first character of all upper case unaltered', () => {
    expect(upperFirst('FRED')).toEqual('FRED');
  });

  it('should work with an empty string', () => {
    expect(upperFirst('')).toEqual('');
  });

  it('should keep white space and not alter string', () => {
    expect(upperFirst('  fred')).toEqual('  fred');
  });
});
