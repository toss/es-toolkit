import { describe, expect, it } from 'vitest';
import { join } from './join.js';

describe('join', () => {
  it('should join elements of an array into a string', () => {
    const arr = ['a', 'b', 'c'];
    const result = join(arr);
    expect(result).toBe('a,b,c');
  });

  it('should join elements of an array into a string with a custom separator', () => {
    const arr = ['a', 'b', 'c'];
    const result = join(arr, '~');
    expect(result).toBe('a~b~c');
  });
});
