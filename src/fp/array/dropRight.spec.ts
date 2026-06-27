import { describe, expect, it } from 'vitest';
import { dropRight } from './dropRight.ts';
import { pipe } from '../pipe.ts';

describe('dropRight', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3, 4], dropRight(2))).toEqual([1, 2]);
  });
});
