import { describe, expect, it } from 'vitest';
import { entriesIn } from './entriesIn';
import { toPairsIn } from './toPairsIn';

describe('entriesIn', () => {
  it('should be an alias of toPairsIn', () => {
    expect(entriesIn).toBe(toPairsIn);
  });
});
