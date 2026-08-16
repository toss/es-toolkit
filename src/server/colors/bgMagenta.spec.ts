import { describe, expect, it } from 'vitest';
import { bgMagenta } from './bgMagenta.ts';

describe('bgMagenta', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(bgMagenta('x')).toBe('\x1b[45mx\x1b[49m');
  });
});
