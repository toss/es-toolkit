import { describe, expect, it } from 'vitest';
import { isJSONString } from './isJSONString';

describe('isJSONString', () => {
  it('should return `true` if the value is JSON string', () => {
    expect(isJSONString('{"name": "John", "age": 30}')).toBe(true);
    expect(isJSONString('[1, 2, 3]')).toBe(true);
  });

  it('should return `false` if the value is not JSON string', () => {
    expect(isJSONString({ name: 'John', age: 30 })).toBe(false);
    expect(isJSONString(1)).toBe(false);
    expect(isJSONString(null)).toBe(false);
    expect(isJSONString(undefined)).toBe(false);
    expect(isJSONString('1')).toBe(false);
    expect(isJSONString('true')).toBe(false);
    expect(isJSONString('function () {}')).toBe(false);
    expect(isJSONString('/test/')).toBe(false);
  });
});
