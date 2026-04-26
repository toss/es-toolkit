import { describe, expect, it } from 'vitest';
import { deepFreeze } from './deepFreeze';

describe('deepFreeze', () => {
  it('should freeze nested objects', () => {
    const obj = deepFreeze({ user: { name: 'Alex', age: 20 } });

    expect(Object.isFrozen(obj)).toBe(true);
    expect(Object.isFrozen(obj.user)).toBe(true);
  });

  it('should freeze nested arrays', () => {
    const obj = deepFreeze({ items: [1, 2, { nested: true }] });

    expect(Object.isFrozen(obj)).toBe(true);
    expect(Object.isFrozen(obj.items)).toBe(true);
    expect(Object.isFrozen(obj.items[2])).toBe(true);
  });

  it('should return the same object', () => {
    const obj = { a: 1 };
    expect(deepFreeze(obj)).toBe(obj);
  });

  it('should handle primitives', () => {
    expect(deepFreeze(42)).toBe(42);
    expect(deepFreeze('hello')).toBe('hello');
    expect(deepFreeze(null)).toBe(null);
    expect(deepFreeze(undefined)).toBe(undefined);
    expect(deepFreeze(true)).toBe(true);
  });

  it('should handle deeply nested objects', () => {
    const obj = deepFreeze({ a: { b: { c: { d: 1 } } } });

    expect(Object.isFrozen(obj.a)).toBe(true);
    expect(Object.isFrozen(obj.a.b)).toBe(true);
    expect(Object.isFrozen(obj.a.b.c)).toBe(true);
  });

  it('should handle circular references', () => {
    const obj: Record<string, any> = { a: 1 };
    obj.self = obj;

    const frozen = deepFreeze(obj);

    expect(Object.isFrozen(frozen)).toBe(true);
    expect(frozen.self).toBe(frozen);
  });

  it('should handle an empty object', () => {
    const obj = deepFreeze({});
    expect(Object.isFrozen(obj)).toBe(true);
  });

  it('should freeze arrays directly', () => {
    const arr = deepFreeze([1, [2, 3], { a: 4 }]);

    expect(Object.isFrozen(arr)).toBe(true);
    expect(Object.isFrozen(arr[1])).toBe(true);
    expect(Object.isFrozen(arr[2])).toBe(true);
  });

  it('should freeze Date and RegExp objects', () => {
    const obj = deepFreeze({ date: new Date(), regex: /test/ });

    expect(Object.isFrozen(obj.date)).toBe(true);
    expect(Object.isFrozen(obj.regex)).toBe(true);
  });

  it('should prevent modifications in strict mode', () => {
    'use strict';
    const obj = deepFreeze({ user: { name: 'Alex', age: 20 } });

    expect(() => {
      (obj as any).user = {};
    }).toThrow();

    expect(() => {
      (obj as any).user.age = 22;
    }).toThrow();
  });
});
