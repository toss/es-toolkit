import { describe, expect, it } from 'vitest';
import { serializeSymbol } from './serializeSymbol';

describe('serializeSymbol', () => {
  it('should serialize symbols with a quoted description', () => {
    expect(serializeSymbol(Symbol('test'))).toBe("Symbol('test')");
  });

  it('should distinguish no description from an empty description', () => {
    expect(serializeSymbol(Symbol())).toBe('Symbol()');
    expect(serializeSymbol(Symbol(''))).toBe("Symbol('')");
  });

  it('should serialize registered symbols the same as unregistered ones', () => {
    expect(serializeSymbol(Symbol.for('test'))).toBe("Symbol('test')");
  });

  it('should serialize well-known symbols', () => {
    expect(serializeSymbol(Symbol.iterator)).toBe("Symbol('Symbol.iterator')");
  });
});
