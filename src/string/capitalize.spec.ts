import { describe, it, expect, expectTypeOf } from 'vitest';
import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('should converts the first character of string to upper case', async () => {
    expect(capitalize('fred')).toEqual('Fred');
  });

  it('should converts the first character of string to upper case and the remaining to lower case.', async () => {
    expect(capitalize('FRED')).toEqual('Fred');
  });

  it('should handle special characters correctly', async () => {
    expect(capitalize('special@characters!')).toEqual('Special@characters!');
  });

  it('should handle hyphen correctly', async () => {
    expect(capitalize('hyphen-text')).toEqual('Hyphen-text');
  });

  it('should handle leading whitepspace', async () => {
    expect(capitalize(' fred')).toEqual(' fred');
  });

  it('should handle strings that are already in capitalize', async () => {
    expect(capitalize('Fred')).toEqual('Fred');
  });

  it('should work with an empty string', async () => {
    expect(capitalize('')).toEqual('');
  });

  it('handles return type properly', async () => {
    expectTypeOf(capitalize('fred')).toEqualTypeOf<'Fred'>();
    expectTypeOf(capitalize('FRED')).toEqualTypeOf<'Fred'>();
    expectTypeOf(capitalize('special@characters!')).toEqualTypeOf<'Special@characters!'>();
    expectTypeOf(capitalize('hyphen-text')).toEqualTypeOf<'Hyphen-text'>();
    expectTypeOf(capitalize(' fred')).toEqualTypeOf<' fred'>();
    expectTypeOf(capitalize('Fred')).toEqualTypeOf<'Fred'>();
    expectTypeOf(capitalize('')).toEqualTypeOf<''>();
    expectTypeOf(capitalize('FOO_BAR' as string)).toEqualTypeOf<string>();
  });
});
