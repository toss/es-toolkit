import { describe, it, expect } from 'vitest';
import { join } from './join.ts';

describe('join', () => {
  it('should join elements of a string array using separator ","', () => {
    const result = join(['apple', 'banana', 'cherry'], ',');
    expect(result).toBe('apple,banana,cherry');
  });

  it('should join elements of a number array using separator ","', () => {
    const result = join([1, 2, 3], ',');
    expect(result).toBe('1,2,3');
  });

  it('should return an empty string for an empty array using separator ","', () => {
    const result = join([], ',');
    expect(result).toBe('');
  });

  it('should handle arrays with undefined or null elements properly using separator ","', () => {
    const result = join([undefined, null, 'apple'], ',');
    expect(result).toBe(',,apple');
  });

  it('should handle arrays with only one element without adding separator ","', () => {
    const result = join(['apple'], ',');
    expect(result).toBe('apple');
  });

  it('should handle arrays with complex objects by using their toString method and separator ","', () => {
    const objects = [{ toString: () => 'object1' }, { toString: () => 'object2' }];
    const result = join(objects, ',');
    expect(result).toBe('object1,object2');
  });

  it('should be able to join elements using separator " - "', () => {
    const result = join(['apple', 'banana', 'cherry'], ' - ');
    expect(result).toBe('apple - banana - cherry');
  });

  it('should handle numeric values and strings in the same array using separator ","', () => {
    const result = join([1, 'apple', 2, 'banana'], ',');
    expect(result).toBe('1,apple,2,banana');
  });
});
