import { describe, expect, it } from 'vitest';
import { initial } from './initial.ts';
import { pipe } from '../pipe.ts';

describe('initial', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3], initial())).toEqual([1, 2]);
  });
});
