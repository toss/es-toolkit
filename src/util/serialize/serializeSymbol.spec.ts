import { describe, expect, it } from 'vitest';
import { serializeSymbol } from './serializeSymbol';

describe('serializeSymbol', () => {
  it('should serialize symbols using their description', () => {
    expect(serializeSymbol(Symbol('test'))).toBe('Symbol(test)');
    expect(serializeSymbol(Symbol())).toBe('Symbol()');
  });

  it('should serialize registered symbols the same as unregistered ones', () => {
    expect(serializeSymbol(Symbol.for('test'))).toBe('Symbol(test)');
  });

  it('should serialize well-known symbols', () => {
    expect(serializeSymbol(Symbol.iterator)).toBe('Symbol(Symbol.iterator)');
  });
});
