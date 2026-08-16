import { describe, expect, it } from 'vitest';
import { length } from './length.ts';
import { pipe } from '../pipe.ts';

describe('length', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3], length())).toEqual(3);
  });
});
