import { describe, expect, it } from 'vitest';
import { serializeBigInt } from './serializeBigInt';

describe('serializeBigInt', () => {
  it('should serialize bigints with an n suffix', () => {
    expect(serializeBigInt(0n)).toBe('0n');
    expect(serializeBigInt(123n)).toBe('123n');
    expect(serializeBigInt(-123n)).toBe('-123n');
    expect(serializeBigInt(9007199254740991n)).toBe('9007199254740991n');
  });

  it('should serialize bigints larger than Number.MAX_SAFE_INTEGER', () => {
    expect(serializeBigInt(123456789012345678901234567890n)).toBe('123456789012345678901234567890n');
  });
});
