import { describe, expect, it } from 'vitest';
import { hash as browserHash } from './browser';
import { hash as nodeHash } from './node';

describe('hash (browser)', () => {
  it('should produce output identical to the node implementation', () => {
    const values: unknown[] = [
      null,
      undefined,
      0,
      -0,
      123n,
      'hello world 😎',
      { b: 2, a: 1 },
      [1, 2n, 'a', { k: 1 }],
      new Set([3, 1, 2]),
      new Map<unknown, unknown>([
        ['b', 2],
        ['a', 1],
      ]),
      new Date(0),
      new Uint8Array([1, 2, 3]),
      { nested: { deeply: { value: [1, { x: new Set(['a', 'b']) }] } } },
    ];

    for (const value of values) {
      expect(browserHash(value), serializeLabel(value)).toBe(nodeHash(value));
    }
  });

  it('should produce a 43-character Base64URL string', () => {
    expect(browserHash([1, 2, 3])).toBe('phXuruId5Red4IDejDBSyNqQEThAa6ccOMAyhF99VPQ');
    expect(browserHash({ a: 1 })).toMatch(/^[A-Za-z0-9_-]{43}$/);
  });

  it('should not depend on key insertion order', () => {
    expect(browserHash({ b: 2, a: 1 })).toBe(browserHash({ a: 1, b: 2 }));
  });

  it('should hash circular references identically to the node implementation', () => {
    const object: Record<string, unknown> = {};
    object.self = object;
    expect(browserHash(object)).toBe(nodeHash(object));
  });

  it('should throw a TypeError for values that cannot be serialized', () => {
    expect(() => browserHash(new WeakMap())).toThrow(TypeError);
  });
});

function serializeLabel(value: unknown): string {
  try {
    return String(value);
  } catch {
    return typeof value;
  }
}
