import { describe, expect, it } from 'vitest';
import { stringifySearch } from './stringifySearch';

describe('stringifySearch', () => {
  it('should return an empty string for an empty object', () => {
    expect(stringifySearch({})).toBe('');
  });

  it('should serialize key-value pairs with a leading question mark', () => {
    expect(stringifySearch({ a: 'x', b: 'y' })).toBe('?a=x&b=y');
  });

  it('should omit null and undefined values', () => {
    expect(stringifySearch({ a: 1, b: null, c: undefined, d: 2 })).toBe('?a=1&d=2');
    expect(stringifySearch({ a: null, b: undefined })).toBe('');
  });

  it('should keep empty strings', () => {
    expect(stringifySearch({ a: '' })).toBe('?a=');
  });

  it('should convert numbers, booleans, and bigints with String()', () => {
    expect(stringifySearch({ a: 0, b: -0, c: 1.5, d: true, e: false, f: 10n, g: NaN })).toBe(
      '?a=0&b=0&c=1.5&d=true&e=false&f=10&g=NaN'
    );
  });

  it('should serialize arrays as repeated keys', () => {
    expect(stringifySearch({ tags: ['a', 'b'], ids: [1, 2] })).toBe('?tags=a&tags=b&ids=1&ids=2');
  });

  it('should omit null and undefined elements in arrays', () => {
    expect(stringifySearch({ a: [1, null, undefined, 2] })).toBe('?a=1&a=2');
  });

  it('should omit empty arrays and arrays without values', () => {
    expect(stringifySearch({ a: [], b: [null, undefined], c: 'x' })).toBe('?c=x');
  });

  it('should accept readonly arrays', () => {
    const tags = ['a', 'b'] as const;
    expect(stringifySearch({ tags })).toBe('?tags=a&tags=b');
  });

  it('should encode spaces as %20 and plus signs as %2B', () => {
    expect(stringifySearch({ q: 'a b+c' })).toBe('?q=a%20b%2Bc');
  });

  it('should encode reserved characters in keys and values', () => {
    expect(stringifySearch({ 'a&b': 'x=y?z#w/v' })).toBe('?a%26b=x%3Dy%3Fz%23w%2Fv');
    expect(stringifySearch({ 'a[]': '1', 'k.l': '2' })).toBe('?a%5B%5D=1&k.l=2');
  });

  it('should keep the characters that encodeURIComponent does not encode', () => {
    expect(stringifySearch({ a: "-_.!~*'()" })).toBe("?a=-_.!~*'()");
  });

  it('should encode non-ASCII characters as UTF-8', () => {
    expect(stringifySearch({ q: '한글', e: '😀' })).toBe('?q=%ED%95%9C%EA%B8%80&e=%F0%9F%98%80');
  });

  it('should keep insertion order except for array-index keys', () => {
    expect(stringifySearch({ b: 1, a: 2 })).toBe('?b=1&a=2');
    expect(stringifySearch({ b: 1, 10: 't', 2: 's' })).toBe('?2=s&10=t&b=1');
  });

  it('should produce a value that URLSearchParams and decodeURIComponent read the same way', () => {
    const search = stringifySearch({ q: 'a b+c' });

    expect(new URLSearchParams(search).get('q')).toBe('a b+c');
    expect(decodeURIComponent(search.slice('?q='.length))).toBe('a b+c');
  });

  it('should produce repeated keys that URLSearchParams reads as an array', () => {
    const search = stringifySearch({ tags: ['x y', '+'] });

    expect(new URLSearchParams(search).getAll('tags')).toEqual(['x y', '+']);
  });

  it('should return a query without the question mark with slice(1)', () => {
    expect(stringifySearch({ id: 1 }).slice(1)).toBe('id=1');
    expect(stringifySearch({}).slice(1)).toBe('');
  });

  it('should throw a URIError for unpaired surrogates', () => {
    expect(() => stringifySearch({ a: '\uD800' })).toThrow(URIError);
    expect(() => stringifySearch({ '\uD800': 'a' })).toThrow(URIError);
  });

  it('should accept objects declared with an interface', () => {
    interface Params {
      id: number;
      ref?: string;
      tags: readonly string[];
    }

    const params: Params = { id: 1, tags: ['a'] };

    expect(stringifySearch(params)).toBe('?id=1&tags=a');
  });

  it('should reject unsupported values at the type level', () => {
    // @ts-expect-error - nested objects are not supported
    expect(stringifySearch({ filter: { status: 'open' } })).toBe('?filter=%5Bobject%20Object%5D');
    // @ts-expect-error - Date is not supported
    expect(typeof stringifySearch({ date: new Date(0) })).toBe('string');
    // @ts-expect-error - null is not an object with query values
    expect(() => stringifySearch(null)).toThrow(TypeError);
  });
});
