import { describe, expect, it } from 'vitest';
import { assignInWith } from './assignInWith';
import { extendWith } from './extendWith';

describe('extendWith', () => {
  it('should be an alias of assignInWith', () => {
    expect(extendWith).toBe(assignInWith);
  });
});
