import { describe, expect, it } from 'vitest';
import { stringify } from './stringify';

describe('stringify', () => {
  it('should return an empty string when there is nothing to serialize', () => {
    expect(stringify({})).toBe('');
    expect(stringify({ a: null, b: undefined, c: [], d: [null, undefined] })).toBe('');
  });

  it('should serialize key-value pairs in insertion order with a leading question mark', () => {
    expect(stringify({ b: 'y', a: 'x' })).toBe('?b=y&a=x');
  });

  it('should omit null and undefined values, including inside arrays', () => {
    expect(stringify({ a: 1, b: null, c: undefined, d: [2, null, undefined, 3] })).toBe('?a=1&d=2&d=3');
  });

  it('should keep empty strings', () => {
    expect(stringify({ a: '' })).toBe('?a=');
  });

  it('should convert numbers, booleans, and bigints with String()', () => {
    expect(stringify({ a: 0, b: -0, c: 1.5, d: true, e: false, f: 10n, g: NaN })).toBe(
      '?a=0&b=0&c=1.5&d=true&e=false&f=10&g=NaN'
    );
  });

  it('should serialize arrays as repeated keys', () => {
    expect(stringify({ tags: ['x y', '+'], ids: [1, 2] })).toBe('?tags=x%20y&tags=%2B&ids=1&ids=2');
  });

  it('should encode keys and values with encodeURIComponent', () => {
    expect(stringify({ q: 'a b+c' })).toBe('?q=a%20b%2Bc');
    expect(stringify({ 'a&b': 'x=y?z#w/v' })).toBe('?a%26b=x%3Dy%3Fz%23w%2Fv');
  });

  it('should throw a URIError for unpaired surrogates', () => {
    expect(() => stringify({ a: '\uD800' })).toThrow(URIError);
    expect(() => stringify({ '\uD800': 'a' })).toThrow(URIError);
  });

  it('should accept objects declared with an interface', () => {
    interface Params {
      id: number;
      ref?: string;
      tags: readonly string[];
    }

    const params: Params = { id: 1, tags: ['a'] };

    expect(stringify(params)).toBe('?id=1&tags=a');
  });

  it('should reject unsupported values at the type level', () => {
    // @ts-expect-error - nested objects are not supported
    expect(typeof stringify({ filter: { status: 'open' } })).toBe('string');
    // @ts-expect-error - Date is not supported
    expect(typeof stringify({ date: new Date(0) })).toBe('string');
    // @ts-expect-error - null is not an object with query values
    expect(() => stringify(null)).toThrow(TypeError);
  });
});
