import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { createHash } from 'node:crypto';
import { sha256 } from './sha256';

function nodeSha256(data: string): string {
  return createHash('sha256').update(data).digest('base64url');
}

describe('sha256', () => {
  it('should match node:crypto for well-known vectors', () => {
    expect(sha256('')).toBe(nodeSha256(''));
    expect(sha256('abc')).toBe(nodeSha256('abc'));
    expect(sha256('hello world')).toBe(nodeSha256('hello world'));
  });

  it('should produce a 43-character Base64URL string', () => {
    const digest = sha256('abc');
    expect(digest).toHaveLength(43);
    expect(digest).toMatch(/^[A-Za-z0-9_-]{43}$/);
  });

  it('should match node:crypto at padding block boundaries', () => {
    // 55/56 straddle the single-block padding limit; 64 is the block size;
    // 119/120 straddle the two-block padding limit.
    for (const length of [1, 54, 55, 56, 57, 63, 64, 65, 119, 120, 121, 128, 1000]) {
      const data = 'a'.repeat(length);
      expect(sha256(data), `length ${length}`).toBe(nodeSha256(data));
    }
  });

  it('should match node:crypto for multi-byte UTF-8 input', () => {
    for (const data of ['한글', 'ありがとう', '😎🎉', 'café', '߿ࠀ￿', '\u{10FFFF}']) {
      expect(sha256(data), data).toBe(nodeSha256(data));
    }
  });

  it('should match node:crypto for lone surrogates', () => {
    // TextEncoder and Buffer both replace lone surrogates with U+FFFD.
    expect(sha256('\uD800')).toBe(nodeSha256('\uD800'));
    expect(sha256('a\uDC00b')).toBe(nodeSha256('a\uDC00b'));
  });

  it('should match node:crypto for large input', () => {
    const data = 'x'.repeat(1_000_000);
    expect(sha256(data)).toBe(nodeSha256(data));
  });

  it('should match node:crypto for arbitrary strings', () => {
    fc.assert(
      fc.property(fc.string({ unit: 'binary', size: 'large' }), data => {
        expect(sha256(data)).toBe(nodeSha256(data));
      })
    );
  });
});
