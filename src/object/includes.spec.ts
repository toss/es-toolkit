import { describe, it, expect } from 'vitest';
import { includes } from './includes';

describe('includes', () => {
  const symbol1 = Symbol('sym1');

  const object = {
    a: 1,
    b: 'a',
    c: NaN,
    d: undefined,
    e: null,
    f: Infinity,
    g: -0,
    h: symbol1,
  };

  it('should return true if the object includes the target value', () => {
    expect(includes(object, 1)).toBe(true);
    expect(includes(object, 'a')).toBe(true);
    expect(includes(object, NaN)).toBe(true); // SameValueZero
    expect(includes(object, undefined)).toBe(true);
    expect(includes(object, null)).toBe(true);
    expect(includes(object, Infinity)).toBe(true);
    expect(includes(object, Symbol('sym1'))).toBe(false);
    expect(includes(object, -0)).toBe(true);
    expect(includes(object, 0)).toBe(true); // SameValueZero
    expect(includes(object, symbol1)).toBe(true);
  });

  it('should return false if the object does not include the target value', () => {
    expect(includes(object, 2)).toBe(false);
    expect(includes(object, 'b')).toBe(false);
    expect(includes(object, Symbol('sym1'))).toBe(false);
    expect(includes(object, -Infinity)).toBe(false);
    expect(includes(object, false)).toBe(false);
    expect(includes(object, true)).toBe(false);
  });

  const objectWithSymbol = {
    [Symbol('sym1')]: 1,
    [Symbol('sy2')]: 'a',
    [Symbol('sym3')]: NaN,
    [Symbol('sym4')]: undefined,
    [Symbol('sym5')]: null,
    [Symbol('sym6')]: Infinity,
    [Symbol('sym7')]: -0,
    [Symbol('sym8')]: symbol1,
  };
  it('should return true if the object includes the target value with symbol keys', () => {
    expect(includes(objectWithSymbol, 'a', { allowSymbolKeyed: true })).toBe(true);
    expect(includes(objectWithSymbol, 1, { allowSymbolKeyed: true })).toBe(true);
    expect(includes(objectWithSymbol, NaN, { allowSymbolKeyed: true })).toBe(true); // SameValueZero
    expect(includes(objectWithSymbol, undefined, { allowSymbolKeyed: true })).toBe(true);
    expect(includes(objectWithSymbol, null, { allowSymbolKeyed: true })).toBe(true);
    expect(includes(objectWithSymbol, Infinity, { allowSymbolKeyed: true })).toBe(true);
    expect(includes(objectWithSymbol, -0, { allowSymbolKeyed: true })).toBe(true);
    expect(includes(objectWithSymbol, 0, { allowSymbolKeyed: true })).toBe(true); // SameValueZero
    expect(includes(objectWithSymbol, symbol1, { allowSymbolKeyed: true })).toBe(true);
  });

  it('should return false if the object does not include the target value with symbol keys', () => {
    expect(includes(objectWithSymbol, 'b', { allowSymbolKeyed: true })).toBe(false);
    expect(includes(objectWithSymbol, 2, { allowSymbolKeyed: true })).toBe(false);
    expect(includes(objectWithSymbol, Symbol('sym1'), { allowSymbolKeyed: true })).toBe(false);
    expect(includes(objectWithSymbol, -Infinity, { allowSymbolKeyed: true })).toBe(false);
  });

  class CustomClass {
    a = 1;
    b = 'a';
    c = NaN;
    d = undefined;
    e = null;
    f = Infinity;
    g = -0;
    h = symbol1;
  }

  const instance = new CustomClass();

  it('should return true if the object includes the target value', () => {
    expect(includes(instance, 1)).toBe(true);
    expect(includes(instance, 'a')).toBe(true);
    expect(includes(instance, NaN)).toBe(true); // SameValueZero
    expect(includes(instance, undefined)).toBe(true);
    expect(includes(instance, null)).toBe(true);
    expect(includes(instance, Infinity)).toBe(true);
    expect(includes(instance, Symbol('sym1'))).toBe(false);
    expect(includes(instance, -0)).toBe(true);
    expect(includes(instance, 0)).toBe(true); // SameValueZero
    expect(includes(instance, symbol1)).toBe(true);
  });

  it('should return false if the object does not include the target value', () => {
    expect(includes(instance, 2)).toBe(false);
    expect(includes(instance, 'b')).toBe(false);
    expect(includes(instance, Symbol('sym1'))).toBe(false);
    expect(includes(instance, -Infinity)).toBe(false);
    expect(includes(instance, false)).toBe(false);
    expect(includes(instance, true)).toBe(false);
  });
});
