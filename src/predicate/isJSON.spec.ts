import { describe, expect, it } from 'vitest';
import { isJSON } from './isJSON';

describe('isJSON', () => {
  it('returns true if the value is a valid JSON string', () => {
    expect(isJSON('{"name":"John","age":30}')).toBe(true);
    expect(isJSON('[1,2,3]')).toBe(true);
    expect(isJSON('"string"')).toBe(true);
    expect(isJSON('123')).toBe(true);
    expect(isJSON('true')).toBe(true);
    expect(isJSON('false')).toBe(true);
    expect(isJSON('null')).toBe(true);
  });

  it('returns false if the value is not a valid JSON string', () => {
    expect(isJSON('invalid json')).toBe(false);
    expect(isJSON('{"unclosed": "object"')).toBe(false);
    expect(isJSON('[1,2,')).toBe(false);
    expect(isJSON('undefined')).toBe(false);
    expect(isJSON('')).toBe(false);
  });

  it('returns false if the value is not a string', () => {
    expect(isJSON(null)).toBe(false);
    expect(isJSON(undefined)).toBe(false);
    expect(isJSON(123)).toBe(false);
    expect(isJSON(true)).toBe(false);
    expect(isJSON({})).toBe(false);
    expect(isJSON([])).toBe(false);
    expect(isJSON(new Date())).toBe(false);
    expect(isJSON(() => {})).toBe(false);
  });
});
