import { describe, expect, it } from 'vitest';
import { entries } from './entries';
import { toPairs } from './toPairs';

describe('entries', () => {
  it('should be an alias of toPairs', () => {
    expect(entries).toBe(toPairs);
  });
});
