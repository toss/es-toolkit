import { describe, expect, it } from 'vitest';
import { head } from './head.ts';
import { pipe } from '../pipe.ts';

describe('head', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3], head())).toEqual(1);
  });
});
