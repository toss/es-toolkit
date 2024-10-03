import { describe, expect, it } from 'vitest';
import { invert } from './invert';

describe('invert', () => {
  it('should invert a simple object with string keys and number values', () => {
    expect(invert({ a: 1, b: 2, c: 3 })).toEqual({ 1: 'a', 2: 'b', 3: 'c' });
  });

  it('should invert an object with number keys and string values', () => {
    expect(invert({ 1: 'a', 2: 'b', 3: 'c' })).toEqual({ a: '1', b: '2', c: '3' });
  });

  it('should handle an object with mixed key and value types', () => {
    expect(invert({ a: 1, 2: 'b', c: 3, 4: 'd' })).toEqual({ 1: 'a', b: '2', 3: 'c', d: '4' });
  });

  it('should handle an object with symbol keys', () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');
    expect(invert({ a: sym1, b: sym2 })).toEqual({ [sym1]: 'a', [sym2]: 'b' });
  });

  it('should handle an empty object', () => {
    expect(invert({})).toEqual({});
  });

  it('should handle objects with duplicate values by keeping the last key', () => {
    expect(invert({ a: 1, b: 1, c: 2 })).toEqual({ 1: 'b', 2: 'c' });
  });

  it('should work with values that shadow keys on `Object.prototype`', () => {
    const object = { a: 'hasOwnProperty', b: 'constructor' };
    expect(invert(object)).toEqual({ hasOwnProperty: 'a', constructor: 'b' });
  });

  it('should work with an object that has a `length` property', () => {
    const object = { 0: 'a', 1: 'b', length: 2 };
    expect(invert(object)).toEqual({ a: '0', b: '1', 2: 'length' });
  });

  it('should not invert inherited properties', () => {
    const object = Object.create({ a: 1 });
    object.b = 2;
    expect(invert(object)).toEqual({ 2: 'b' });
  });
});
