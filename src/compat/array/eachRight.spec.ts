import { describe, expect, it } from 'vitest';
import { eachRight } from './eachRight';
import { forEachRight } from './forEachRight';

describe('eachRight', () => {
  it('should be an alias of forEachRight', () => {
    expect(eachRight).toBe(forEachRight);
  });
});
