import { describe, expect, it } from 'vitest';
import { bgCyanBright } from './bgCyanBright.ts';

describe('bgCyanBright', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(bgCyanBright('x')).toBe('\x1b[106mx\x1b[49m');
  });
});
