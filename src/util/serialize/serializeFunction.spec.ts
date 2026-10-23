import { describe, expect, it, vi } from 'vitest';
import { serializeFunction } from './serializeFunction';

describe('serializeFunction', () => {
  it('should serialize function declarations as name:source', () => {
    function sum(a: number, b: number) {
      return a + b;
    }
    expect(serializeFunction(sum)).toBe('sum:function sum(a, b) {return a + b;}');
  });

  it('should serialize arrow functions as name:source', () => {
    const sum = (a: number, b: number) => a + b;
    expect(serializeFunction(sum)).toBe('sum:(a, b) => a + b');
  });

  it('should collapse newlines and surrounding whitespace in the source', () => {
    function withBranches(a: number) {
      if (a > 0) {
        return a;
      }
      return -a;
    }
    expect(serializeFunction(withBranches)).toBe(
      'withBranches:function withBranches(a) {if (a > 0) {return a;};return -a;}'
    );
  });

  it('should serialize classes as name:source', () => {
    class Foo {
      x = 1;
    }
    expect(serializeFunction(Foo)).toBe('Foo:class Foo {x = 1;}');
  });

  it('should serialize native functions as name:[native]', () => {
    expect(serializeFunction(Math.max)).toBe('max:[native]');
    expect(serializeFunction(Array)).toBe('Array:[native]');
    expect(serializeFunction(parseInt)).toBe('parseInt:[native]');
  });

  it('should serialize native accessors and methods as name:[native]', () => {
    const size = Object.getOwnPropertyDescriptor(Map.prototype, 'size')!.get!;
    expect(serializeFunction(size)).toBe('get size:[native]');
    expect(serializeFunction([][Symbol.iterator])).toBe('values:[native]');
  });

  it('should serialize bound functions and callable proxies as name:[native]', () => {
    function original(a: number) {
      return a;
    }
    expect(serializeFunction(original.bind(null))).toBe('bound original:[native]');
    expect(serializeFunction(new Proxy(original, {}))).toBe('original:[native]');
  });

  it.each([
    ['JavaScriptCore and SpiderMonkey', 'function max() {\n    [native code]\n}'],
    ['tab indentation', 'function max() {\n\t[native code]\n}'],
    ['CRLF line endings', 'function max() {\r\n    [native code]\r\n}'],
    ['no whitespace', 'function max(){[native code]}'],
  ])('should recognize the native source format of %s', (_, source) => {
    const toString = vi.spyOn(Function.prototype, 'toString').mockReturnValueOnce(source);
    expect(serializeFunction(Math.max)).toBe('max:[native]');
    toString.mockRestore();
  });

  it('should not treat user functions that merely contain the native marker as native', () => {
    const inString = () => '{ [native code] }';
    const inComment = () => {
      // [native code]
    };
    const inArray = () => {
      const native = 1;
      const code = 2;
      return [native, code];
    };
    const inTemplate = () => `function f() {
      [native code]
    }`;

    for (const fn of [inString, inComment, inArray, inTemplate]) {
      expect(serializeFunction(fn)).not.toContain(':[native]');
    }
  });

  it('should distinguish functions with identical sources by name', () => {
    const first = (a: number) => a;
    const second = (a: number) => a;
    expect(serializeFunction(first)).toBe('first:(a) => a');
    expect(serializeFunction(second)).toBe('second:(a) => a');
  });

  it('should serialize anonymous functions with an empty name', () => {
    expect(serializeFunction([(a: number) => a][0])).toBe(':(a) => a');
  });
});
