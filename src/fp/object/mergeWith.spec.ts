import { describe, expect, it } from 'vitest';
import { mergeWith } from './mergeWith';

describe('mergeWith', () => {
  it('(non-curried) should merge properties from source object into target object using custom merge function', () => {
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
  });

  it('(curried) should merge properties from source object into target object using custom merge function', () => {
    const target1 = { a: 1, b: 2 };
    const source1 = { b: 3, c: 4 };

    const result1 = mergeWith(source1, (targetValue, sourceValue) => {
      if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
        return targetValue + sourceValue;
      }
    })(target1);

    expect(result1).toEqual({ a: 1, b: 5, c: 4 });

    const target2 = { a: [1], b: [2] };
    const source2 = { a: [3], b: [4] };

    const result2 = mergeWith(source2, (objValue, srcValue) => {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    })(target2);

    expect(result2).toEqual({ a: [1, 3], b: [2, 4] });
  });

  it('(non-curried) should use custom merge function for nested objects', () => {
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

  it('(curried) should use custom merge function for nested objects', () => {
    const target = { a: { x: 1, y: 1 }, b: 2 };
    const source = { a: { y: 2 }, b: 3 };

    const result = mergeWith(source, (targetValue, sourceValue) => {
      if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
        return targetValue + sourceValue;
      }
    })(target);

    expect(result).toEqual({ a: { x: 1, y: 3 }, b: 5 });

    const target2 = { a: { c: [1] }, b: [2] };
    const source2 = { a: { c: [3] }, b: [4] };

    const result2 = mergeWith(source2, (objValue, srcValue) => {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    })(target2);

    expect(result2).toEqual({ a: { c: [1, 3] }, b: [2, 4] });
  });
});
