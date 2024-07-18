import { describe, it, expect } from 'vitest';
import { endsWith } from './endsWith';

describe('endsWith', () => {
  it('should return true if the string ends with the target string', async () => {
    expect(endsWith('fooBar', 'Bar')).toEqual(true);
  });
  it('should return false if the string does not end with the target string', async () => {
    expect(endsWith('fooBar', 'abc')).toEqual(false);
  });
  it('should return false if the string does not end with the target string, but does contain it', async () => {
    expect(endsWith('fooBar', 'foo')).toEqual(false);
  });
  it('should return true if the target string is an empty string', async () => {
    expect(endsWith('fooBar', '')).toEqual(true);
  });
  it('should return true if the string and target string are empty strings', async () => {
    expect(endsWith('', '')).toEqual(true);
  });
  it('should return false if the string past the provided position does not end with the target string', async () => {
    expect(endsWith('fooBar', 'foo', 5)).toEqual(false);
  });
  it('should return true if the string before the provided position ends with the target string', async () => {
    expect(endsWith('fooBar123', 'foo', 3)).toEqual(true);
  });
});
