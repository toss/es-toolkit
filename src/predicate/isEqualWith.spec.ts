import { describe, expect, it } from 'vitest';
import { isEqualWith } from './isEqualWith';

describe('isEqualWith', () => {
  it('should use the customizer function for string comparison', () => {
    const customizer = (a: any, b: any) => {
      if (typeof a === 'string' && typeof b === 'string') {
        return a.toLowerCase() === b.toLowerCase();
      }
    };

    expect(isEqualWith('Hello', 'hello', customizer)).toBe(true);
    expect(isEqualWith('Hello', 'world', customizer)).toBe(false);
  });

  it('should use the customizer function for number comparison', () => {
    const customizer = (a: any, b: any) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return Math.abs(a - b) < 0.01;
      }
    };

    expect(isEqualWith(1.001, 1.002, customizer)).toBe(true);
    expect(isEqualWith(1.001, 1.02, customizer)).toBe(false);
  });

  it('should use the customizer function for object comparison', () => {
    const customizer = (a: any, b: any, key?: PropertyKey) => {
      if (key === 'date' && a instanceof Date && b instanceof Date) {
        return a.getFullYear() === b.getFullYear();
      }
    };

    const obj1 = { name: 'John', date: new Date('2023-01-01') };
    const obj2 = { name: 'John', date: new Date('2023-06-15') };
    const obj3 = { name: 'John', date: new Date('2024-01-01') };

    expect(isEqualWith(obj1, obj2, customizer)).toBe(true);
    expect(isEqualWith(obj1, obj3, customizer)).toBe(false);
  });

  it('should use the customizer function with parent objects', () => {
    const customizer = (a: any, b: any, key?: PropertyKey, aParent?: any, bParent?: any) => {
      if (key === 'value' && aParent && bParent && aParent.type === 'special' && bParent.type === 'special') {
        return String(a) === String(b);
      }
    };

    const obj1 = { type: 'special', value: 42 };
    const obj2 = { type: 'special', value: '42' };
    const obj3 = { type: 'normal', value: 42 };
    const obj4 = { type: 'normal', value: '42' };

    expect(isEqualWith(obj1, obj2, customizer)).toBe(true);
    expect(isEqualWith(obj1, obj3, customizer)).toBe(false);
    expect(isEqualWith(obj3, obj4, customizer)).toBe(false);
  });
});
