import { describe, it, expect } from 'vitest';
import { isPrototypePollutionKey } from './isPrototypePollutionKey';

describe('isPrototypePollutionKey', () => {
  it('should return true for __proto__', () => {
    expect(isPrototypePollutionKey('__proto__')).toBe(true);
  });

  it('should return true for constructor', () => {
    expect(isPrototypePollutionKey('constructor')).toBe(true);
  });

  it('should return true for prototype', () => {
    expect(isPrototypePollutionKey('prototype')).toBe(true);
  });

  it('should return true for __defineGetter__', () => {
    expect(isPrototypePollutionKey('__defineGetter__')).toBe(true);
  });

  it('should return true for __defineSetter__', () => {
    expect(isPrototypePollutionKey('__defineSetter__')).toBe(true);
  });

  it('should return true for __lookupGetter__', () => {
    expect(isPrototypePollutionKey('__lookupGetter__')).toBe(true);
  });

  it('should return true for __lookupSetter__', () => {
    expect(isPrototypePollutionKey('__lookupSetter__')).toBe(true);
  });

  it('should return false for normal properties', () => {
    expect(isPrototypePollutionKey('toString')).toBe(false);
    expect(isPrototypePollutionKey('valueOf')).toBe(false);
    expect(isPrototypePollutionKey('hasOwnProperty')).toBe(false);
    expect(isPrototypePollutionKey('normal')).toBe(false);
    expect(isPrototypePollutionKey('property')).toBe(false);
  });

  it('should return false for symbols', () => {
    expect(isPrototypePollutionKey(Symbol('test'))).toBe(false);
    expect(isPrototypePollutionKey(Symbol.iterator)).toBe(false);
  });

  it('should return false for numbers', () => {
    expect(isPrototypePollutionKey(0)).toBe(false);
    expect(isPrototypePollutionKey(123)).toBe(false);
  });
});