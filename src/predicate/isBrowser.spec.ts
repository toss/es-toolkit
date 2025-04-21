// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import { isBrowser } from './isBrowser';

describe('isBrowser', () => {
  it('should return true in browser environment', () => {
    expect(isBrowser()).toBe(true);
  });
});
