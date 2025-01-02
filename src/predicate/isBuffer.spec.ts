import { describe, expect, it } from 'vitest';
import { isBuffer } from './isBuffer';

describe('isBuffer', () => {
  it('should return true for Buffer instances', () => {
    const buffer = Buffer.from('test');
    expect(isBuffer(buffer)).toBe(true);
  });

  it('should return false for non-Buffer instances', () => {
    expect(isBuffer(null)).toBe(false);
    expect(isBuffer(undefined)).toBe(false);
    expect(isBuffer(123)).toBe(false);
    expect(isBuffer('string')).toBe(false);
    expect(isBuffer([])).toBe(false);
    expect(isBuffer({})).toBe(false);
    expect(isBuffer(new Uint8Array(2))).toBe(false);
  });

  it('should return false when Buffer is not defined', () => {
    const originalBuffer = global.Buffer;
    // eslint-disable-next-line
    // @ts-ignore
    delete global.Buffer;

    expect(isBuffer(new Uint8Array())).toBe(false);

    global.Buffer = originalBuffer; // Restore Buffer
  });
});
