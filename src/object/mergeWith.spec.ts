import { describe, expect, it } from 'vitest';
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
});
