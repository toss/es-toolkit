import { describe, expect, it } from 'vitest';
import { blackBright } from './blackBright.ts';
import { gray } from './gray.ts';

describe('gray', () => {
  it('should be an alias of blackBright', () => {
    expect(gray).toBe(blackBright);
  });
});
