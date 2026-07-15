import { describe, expect, it } from 'vitest';
import { isURL } from './isURL';

describe('isURL', () => {
  it('returns `true` for valid URLs', () => {
    expect(isURL('https://example.com')).toBe(true);
    expect(isURL('http://localhost:3000')).toBe(true);
    expect(isURL('https://example.com/path?query=123#hash')).toBe(true);
    expect(isURL('ftp://ftp.example.com')).toBe(true);
    expect(isURL('ws://websocket.example.com')).toBe(true);
    expect(isURL('file:///path/to/file')).toBe(true);
  });

  it('returns `true` for valid relative URLs with a base URL', () => {
    expect(isURL('/products', 'https://example.com')).toBe(true);
    expect(isURL('about', 'https://example.com/')).toBe(true);
    expect(isURL('category/shoes', 'https://shop.example.com')).toBe(true);
    expect(isURL('#section', 'https://example.com/page')).toBe(true);
    expect(isURL('?query=value', 'https://example.com/page')).toBe(true);
  });

  it('returns `false` for invalid URLs', () => {
    expect(isURL('example.com')).toBe(false);
    expect(isURL('not a url')).toBe(false);
    expect(isURL('')).toBe(false);
    expect(isURL('http://')).toBe(false);
    expect(isURL('https://')).toBe(false);
    expect(isURL('://example.com')).toBe(false);
  });

  it('returns `false` for non-string values', () => {
    expect(isURL(123)).toBe(false);
    expect(isURL(null)).toBe(false);
    expect(isURL(undefined)).toBe(false);
    expect(isURL({})).toBe(false);
    expect(isURL([])).toBe(false);
    expect(isURL(true)).toBe(false);
    expect(isURL(new Date())).toBe(false);
  });

  it('returns `false` for invalid relative URLs even with a base URL', () => {
    expect(isURL('', 'https://example.com')).toBe(false);
    expect(isURL('not a url', 'https://example.com')).toBe(false);
    expect(isURL('!#$%@#!#@', 'https://example.com')).toBe(false);
  });
});
