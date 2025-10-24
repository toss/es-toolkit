import { describe, expect, it } from 'vitest';
import { cloneDeep } from './cloneDeep';
import { mergeWith } from './mergeWith';

describe('mergeWith', () => {
  it('should merge properties from source object into target object using custom merge function', () => {
    const target1 = { a: 1, b: 2 };
    const source1 = { b: 3, c: 4 };

    const result1 = mergeWith(target1, source1, (targetValue, sourceValue) => {
      if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
        return targetValue + sourceValue;
      }
    });

    expect(result1).toEqual({ a: 1, b: 5, c: 4 });

    const target2 = { a: [1], b: [2] };
    const source2 = { a: [3], b: [4] };

    const result2 = mergeWith(target2, source2, (objValue, srcValue) => {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    });

    expect(result2).toEqual({ a: [1, 3], b: [2, 4] });

    const target3 = { a: { x: 1, y: 1 }, b: [2] };
    const source3 = { a: { x: 2, y: 3 }, b: [4] };

    const result3 = mergeWith(target3, source3, (objValue, srcValue) => {
      if (objValue.x && srcValue.x) {
        return objValue.x + srcValue.x;
      }
    });

    expect(result3).toEqual({ a: 3, b: [4] });
  });

  it('should use custom merge function for nested objects', () => {
    const target = { a: { x: 1, y: 1 }, b: 2 };
    const source = { a: { y: 2 }, b: 3 };

    const result = mergeWith(target, source, (targetValue, sourceValue) => {
      if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
        return targetValue + sourceValue;
      }
    });

    expect(result).toEqual({ a: { x: 1, y: 3 }, b: 5 });

    const target2 = { a: { c: [1] }, b: [2] };
    const source2 = { a: { c: [3] }, b: [4] };

    const result2 = mergeWith(target2, source2, (objValue, srcValue) => {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    });

    expect(result2).toEqual({ a: { c: [1, 3] }, b: [2, 4] });
  });

  it('should respect `null` returned from `customizer`', () => {
    const obj = { prop: null };
    const source = { prop: { foo: 'bar' } };

    expect(
      mergeWith(cloneDeep(obj), cloneDeep(source), targetValue => {
        if (targetValue === null) {
          return null;
        }

        return undefined;
      })
    ).toEqual({ prop: null });
  });

  it('should skip unsafe properties like __proto__', () => {
    const target = { a: 1 };
    const source = Object.create(null);
    source.__proto__ = { b: 2 };
    source.a = 2;
    const result = mergeWith(target, source, (targetValue, sourceValue) => {
      return sourceValue;
    });

    expect(result).toEqual({ a: 2 });
    expect(result.__proto__).toBe(Object.prototype);
  });

  it('should merge arrays when targetValue is undefined and merge function returns undefined', () => {
    const target: { a?: number[] } = {};
    const source = { a: [1, 2, 3] };

    const result = mergeWith(target, source, () => undefined);

    expect(result).toEqual({ a: [1, 2, 3] });
  });

  it('should not overwrite targetValue when sourceValue is undefined and merge function returns undefined', () => {
    const target = { a: 1, b: 2 };
    const source = { a: 3, b: undefined };

    const result = mergeWith(target, source, () => undefined);

    expect(result).toEqual({ a: 3, b: 2 });
  });

  it('should replace non-plain-object target value with plain object from source when merge returns undefined', () => {
    const target = { a: 'string', b: 123, c: true };
    const source = { a: { x: 1 }, b: { y: 2 }, c: { z: 3 } };

    const result = mergeWith(target, source, () => undefined);

    expect(result).toEqual({ a: { x: 1 }, b: { y: 2 }, c: { z: 3 } });
  });

  it('should handle nested case where non-plain-object is replaced with plain object when merge returns undefined', () => {
    const target = { a: { b: null, c: undefined, d: 'text' } };
    const source = { a: { b: { x: 1 }, c: { y: 2 }, d: { z: 3 } } };

    const result = mergeWith(target, source, () => undefined);

    expect(result).toEqual({ a: { b: { x: 1 }, c: { y: 2 }, d: { z: 3 } } });
  });
});
