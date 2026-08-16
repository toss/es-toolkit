import { describe, expect, it } from 'vitest';
import { add } from './add.ts';
import { map } from '../array/map.ts';
import { pipe } from '../pipe.ts';

describe('add', () => {
  it('adds the addend to the piped value', () => {
    expect(pipe(3, add(2))).toBe(5);
  });

  it('works as a map callback', () => {
    expect(pipe([1, 2, 3], map(add(10)))).toEqual([11, 12, 13]);
  });

  it('handles negative addends', () => {
    expect(pipe(5, add(-8))).toBe(-3);
  });
});
