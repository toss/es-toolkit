import { describe, expect, it } from 'vitest';
import { serializeFunction } from './serializeFunction';

describe('serializeFunction', () => {
  it('should serialize functions as name:source', () => {
    // Built with the Function constructor so that the source seen at runtime
    // does not depend on how the test file is transpiled.
    const sum = new Function('a', 'b', 'return a + b');
    expect(serializeFunction(sum)).toBe('anonymous:function anonymous(a,b) {return a + b}');
  });

  it('should serialize arrow functions', () => {
    const sum = (a: number, b: number) => a + b;
    const result = serializeFunction(sum);

    expect(result.startsWith('sum:')).toBe(true);
    expect(result).toContain('=>');
    expect(result).toContain('a + b');
  });

  it('should collapse newlines and surrounding whitespace', () => {
    function sum(a: number, b: number) {
      return a + b;
    }
    expect(serializeFunction(sum)).not.toContain('\n');
  });

  it('should produce the same output for the same function regardless of formatting', () => {
    const compact = new Function('a', 'return a');
    const formatted = new Function('a', '\n  return a\n');
    expect(serializeFunction(compact)).toBe(serializeFunction(formatted));
  });

  it('should serialize native functions as [native]', () => {
    expect(serializeFunction(Math.max)).toBe('max:[native]');
    expect(serializeFunction(Array)).toBe('Array:[native]');
    expect(serializeFunction(parseInt)).toBe('parseInt:[native]');
  });

  it('should serialize bound functions as [native]', () => {
    function original(a: number) {
      return a;
    }
    expect(serializeFunction(original.bind(null))).toBe('bound original:[native]');
  });

  it('should distinguish functions with identical sources by name', () => {
    const first = (a: number) => a;
    const second = (a: number) => a;
    expect(serializeFunction(first)).not.toBe(serializeFunction(second));
  });

  it('should serialize anonymous functions with an empty name', () => {
    const result = serializeFunction([(a: number) => a][0]);
    expect(result.startsWith(':')).toBe(true);
  });
});
