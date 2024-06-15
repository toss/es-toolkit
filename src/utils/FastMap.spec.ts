import { describe, expect, it } from 'vitest';
import { FastMap } from './FastMap';

describe('FastMap', () => {
  it('should set and get values properly', () => {
    const map = new FastMap<number | string, string>();

    map.set(1, 'one');
    map.set('2', 'two');

    expect(map.get(1)).toBe('one');
    expect(map.get('2')).toBe('two');
    expect(map.get(2)).toBeUndefined();
  });

  it('should return undefined for non-existent keys', () => {
    const map = new FastMap<number, string>();

    expect(map.get(1)).toBeUndefined();
  });

  it('should return true for has() if key exists', () => {
    const map = new FastMap<number, string>();

    map.set(1, 'one');

    expect(map.has(1)).toBe(true);
    expect(map.has(2)).toBe(false);
  });

  it('should delete keys', () => {
    const map = new FastMap<number, string>();

    map.set(1, 'one');
    map.delete(1);

    expect(map.has(1)).toBe(false);
  });

  it('should clear all keys', () => {
    const map = new FastMap<number, string>();

    map.set(1, 'one');
    map.set(2, 'two');
    map.clear();

    expect(map.has(1)).toBe(false);
    expect(map.has(2)).toBe(false);
  });

  it('should return the size of the map', () => {
    const map = new FastMap<number, string>();

    map.set(1, 'one');
    map.set(2, 'two');

    expect(map.size).toBe(2);
  });

  it('should handle non-keyable keys', () => {
    const map = new FastMap<object, string>();
    const key1 = {};
    const key2 = {};

    map.set(key1, 'one');
    map.set(key2, 'two');

    expect(map.get(key1)).toBe('one');
    expect(map.get(key2)).toBe('two');
  });

  it('should handle non-keyable keys with the same string representation', () => {
    const map = new FastMap<object, string>();
    const key1 = { toString: () => 'key' };
    const key2 = { toString: () => 'key' };

    map.set(key1, 'one');
    map.set(key2, 'two');

    expect(map.get(key1)).toBe('one');
    expect(map.get(key2)).toBe('two');
  });
});
