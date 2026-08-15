import { describe, expect, it } from 'vitest';
import { last } from './last.ts';
import { pipe } from '../pipe.ts';

describe('last', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3], last())).toEqual(3);
  });
});
