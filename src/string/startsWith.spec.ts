import { describe, it, expect } from 'vitest';
import { startsWith } from './startsWith';

describe('startsWith', () => {
  it('should return true if the string starts with the target string', async () => {
    expect(startsWith('fooBar', 'foo')).toEqual(true);
  });
  it('should return false if the string does not start with the target string', async () => {
    expect(startsWith('fooBar', 'abc')).toEqual(false);
  });
  it('should return false if the string does not start with the target string, but does contain it', async () => {
    expect(startsWith('fooBar', 'Bar')).toEqual(false);
  });
  it('should return true if the target string is an empty string', async () => {
    expect(startsWith('fooBar', '')).toEqual(true);
  });
  it('should return true if the string and target string are empty strings', async () => {
    expect(startsWith('', '')).toEqual(true);
  });
  it('should return false if the string past the provided position does not start with the target string', async () => {
    expect(startsWith('fooBar', 'Bar', 5)).toEqual(false);
  });
  it('should return true if the string past the provided position does start with the target string', async () => {
    expect(startsWith('fooBar', 'Bar', 3)).toEqual(true);
  });
});
