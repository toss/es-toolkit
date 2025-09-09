// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { isNode } from './isNode';

describe('isNode', () => {
  it('should return true in node environment', () => {
    expect(isNode()).toBe(true);
  });
});
