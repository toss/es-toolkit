import { describe, expect, it } from 'vitest';
import { cloneDeepWith } from './cloneDeepWith';
import { noop } from '../function/noop';

describe('cloneDeepWith', () => {
  it('should clone primitive values', () => {
    expect(cloneDeepWith(1, noop)).toBe(1);
    expect(cloneDeepWith('test', noop)).toBe('test');
    expect(cloneDeepWith(true, noop)).toBe(true);
    expect(cloneDeepWith(null, noop)).toBe(null);
    expect(cloneDeepWith(undefined, noop)).toBe(undefined);
  });

  it('should deep clone arrays', () => {
    const original = [1, [2, 3], [4, [5, 6]]];
    const cloned = cloneDeepWith(original, () => undefined);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned[1]).not.toBe(original[1]);
    expect(cloned[2]).not.toBe(original[2]);
    expect((cloned[2] as any)[1]).not.toBe((original[2] as any)[1]);
  });

  it('should deep clone objects', () => {
    const original = {
      a: 1,
      b: { c: 2 },
      d: { e: { f: 3 } },
    };
    const cloned = cloneDeepWith(original, noop);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.b).not.toBe(original.b);
    expect(cloned.d).not.toBe(original.d);
    expect(cloned.d.e).not.toBe(original.d.e);
  });

  it('should handle circular references', () => {
    const original: any = {
      a: 1,
    };
    original.self = original;

    const cloned = cloneDeepWith(original, () => undefined);

    expect(cloned.a).toBe(1);
    expect(cloned.self).toBe(cloned);
  });

  it('should pass correct arguments to customizer', () => {
    const calls: any[] = [];
    const obj = { a: 1, b: { c: 2 } };

    cloneDeepWith(obj, (value, key, object, stack) => {
      calls.push({ value, key, object, hasStack: stack instanceof Map });
      return undefined;
    });

    expect(calls[0]).toEqual({
      value: obj,
      key: undefined,
      object: obj,
      hasStack: true,
    });

    expect(calls[1]).toEqual({
      value: 1,
      key: 'a',
      object: obj,
      hasStack: true,
    });

    expect(calls[2]).toEqual({
      value: obj.b,
      key: 'b',
      object: obj,
      hasStack: true,
    });
  });

  it('should allow customizer to modify values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const customizer = (value: any) => {
      if (typeof value === 'number') {
        return value * 2;
      }
    };

    const cloned = cloneDeepWith(obj, customizer);

    expect(cloned).toEqual({ a: 2, b: 4, c: 6 });
  });

  it('should allow customizer to skip cloning for certain values', () => {
    const obj = { a: 1, b: { c: 2 } };
    const customizer = (value: any) => {
      if (typeof value === 'object') {
        return value;
      }
    };

    const cloned = cloneDeepWith(obj, customizer);

    expect(cloned).toBe(obj);
  });

  it('should allow customizer to replace values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const customizer = (value: any) => {
      if (value === 2) {
        return 42;
      }
    };

    const cloned = cloneDeepWith(obj, customizer);

    expect(cloned).toEqual({ a: 1, b: 42, c: 3 });
  });

  it('should allow customizer to handle arrays', () => {
    const arr = [1, 2, 3];
    const customizer = (value: any) => {
      if (Array.isArray(value)) {
        return value.map(v => v + 1);
      }
    };

    const cloned = cloneDeepWith(arr, customizer);

    expect(cloned).toEqual([2, 3, 4]);
  });

  it('should allow customizer to handle nested objects', () => {
    const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
    const customizer = (value: any) => {
      if (typeof value === 'number') {
        return value * 2;
      }
    };

    const cloned = cloneDeepWith(obj, customizer);

    expect(cloned).toEqual({ a: 2, b: { c: 4, d: { e: 6 } } });
  });
});
