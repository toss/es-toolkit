import { describe, expect, it } from 'vitest';
import { serializeString } from './serializeString';

describe('serializeString', () => {
  it('should wrap the string in single quotes', () => {
    expect(serializeString('abc')).toBe("'abc'");
    expect(serializeString('')).toBe("''");
  });

  it('should keep unicode characters as-is', () => {
    expect(serializeString('hello world 😎')).toBe("'hello world 😎'");
    expect(serializeString('한글')).toBe("'한글'");
  });

  it('should not escape quotes in the string', () => {
    expect(serializeString("a'b")).toBe("'a'b'");
  });
});
