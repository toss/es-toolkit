// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { color } from './color.ts';

describe('color', () => {
  it('should be a pre-configured color instance with auto-detected support', () => {
    expect(typeof color.red).toBe('function');
    expect(typeof color.bold).toBe('function');
    expect(typeof color.hex).toBe('function');
    expect(typeof color.red('hello')).toBe('string');
  });
});
