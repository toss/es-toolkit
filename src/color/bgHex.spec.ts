import { describe, expect, it } from 'vitest';
import { bgHex } from './bgHex.ts';

describe('bgHex', () => {
  it('wraps text with RGB background parsed from #RRGGBB', () => {
    expect(bgHex('#ff6347')('x')).toBe('\x1b[48;2;255;99;71mx\x1b[49m');
  });

  it('wraps text with RGB background parsed from #RGB shorthand', () => {
    expect(bgHex('#f00')('x')).toBe('\x1b[48;2;255;0;0mx\x1b[49m');
  });
});
