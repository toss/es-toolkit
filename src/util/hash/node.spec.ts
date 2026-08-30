import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { hash } from './node';
import { serialize } from '../serialize/serialize';

describe('hash (node)', () => {
  it('should hash the serialized value with SHA-256 in Base64URL format', () => {
    const expected = createHash('sha256')
      .update(serialize({ a: 1, b: 2 }))
      .digest('base64url');
    expect(hash({ a: 1, b: 2 })).toBe(expected);
  });

  it('should produce a 43-character Base64URL string', () => {
    expect(hash([1, 2, 3])).toBe('phXuruId5Red4IDejDBSyNqQEThAa6ccOMAyhF99VPQ');
    expect(hash({ a: 1 })).toMatch(/^[A-Za-z0-9_-]{43}$/);
  });

  it('should not depend on key insertion order', () => {
    expect(hash({ b: 2, a: 1 })).toBe(hash({ a: 1, b: 2 }));
    expect(hash(new Set([3, 1, 2]))).toBe(hash(new Set([2, 3, 1])));
  });

  it('should produce different hashes for different values', () => {
    expect(hash({ a: 1 })).not.toBe(hash({ a: 2 }));
    expect(hash(1)).not.toBe(hash('1'));
    expect(hash([1, 2])).not.toBe(hash(new Set([1, 2])));
  });

  it('should hash circular references', () => {
    const object: Record<string, unknown> = {};
    object.self = object;
    expect(hash(object)).toMatch(/^[A-Za-z0-9_-]{43}$/);
  });

  it('should throw a TypeError for values that cannot be serialized', () => {
    expect(() => hash(new WeakMap())).toThrow(TypeError);
  });
});
