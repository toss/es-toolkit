import { describe, expect, it } from 'vitest';
import { serializePlainObject } from './serializePlainObject';

describe('serializePlainObject', () => {
  it('should serialize plain objects as {key:value}', () => {
    expect(serializePlainObject({ a: 1, b: 2 }, new Map())).toBe('{a:1,b:2}');
    expect(serializePlainObject({}, new Map())).toBe('{}');
  });

  it('should sort keys by code unit', () => {
    expect(serializePlainObject({ b: 2, a: 1 }, new Map())).toBe('{a:1,b:2}');
    expect(serializePlainObject({ 10: 1, 9: 2, 2: 3 }, new Map())).toBe('{10:1,2:3,9:2}');
  });

  it('should serialize nested values', () => {
    expect(serializePlainObject({ a: { b: 'c' }, d: [1, 2] }, new Map())).toBe("{a:{b:'c'},d:[1,2]}");
  });

  it('should ignore symbol keys', () => {
    expect(serializePlainObject({ [Symbol('s')]: 123 }, new Map())).toBe('{}');
  });

  it('should ignore non-enumerable properties', () => {
    const object = {};
    Object.defineProperty(object, 'x', { value: 1, enumerable: false });
    expect(serializePlainObject(object, new Map())).toBe('{}');
  });

  it('should ignore inherited properties', () => {
    const object = Object.create({ inherited: 1 });
    object.own = 2;
    expect(serializePlainObject(object, new Map())).toBe('{own:2}');
  });

  it('should serialize objects with a null prototype', () => {
    const object = Object.create(null);
    object.a = 1;
    expect(serializePlainObject(object, new Map())).toBe('{a:1}');
  });

  it('should invoke getters', () => {
    const object = {
      get a() {
        return 1;
      },
    };
    expect(serializePlainObject(object, new Map())).toBe('{a:1}');
  });
});
