import { describe, expect, it } from 'vitest';
import { identity } from '../../function';

describe('identity', () => {
  it('should return the input value unchanged for a number', () => {
    expect(identity(5)).toBe(5);
  });

  it('should return the input value unchanged for a string', () => {
    expect(identity('hello')).toBe('hello');
  });

  it('should return the input value unchanged for an object', () => {
    const obj = { key: 'value' };
    expect(identity(obj)).toBe(obj);
  });

  it('should return the input value unchanged for an array', () => {
    const arr = [1, 2, 3];
    expect(identity(arr)).toBe(arr);
  });

  it('should return the input value unchanged for a boolean', () => {
    expect(identity(true)).toBe(true);
    expect(identity(false)).toBe(false);
  });
});
