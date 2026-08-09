import { describe, expect, it } from 'vitest';
import { first } from './first';
import { head } from './head';

describe('first', () => {
  it('should be an alias of head', () => {
    expect(first).toBe(head);
  });
});
