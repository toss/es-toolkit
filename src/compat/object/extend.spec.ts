import { describe, expect, it } from 'vitest';
import { assignIn } from './assignIn';
import { extend } from './extend';

describe('extend', () => {
  it('should be an alias of assignIn', () => {
    expect(extend).toBe(assignIn);
  });
});
