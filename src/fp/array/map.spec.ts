import { describe, expect, it, vi } from 'vitest';
import { map } from './map.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('map', () => {
  it('maps each element through the callback', () => {
    expect(
      pipe(
        [1, 2, 3],
        map(x => x * 2)
      )
    ).toEqual([2, 4, 6]);
  });

  it('passes the index as the second argument', () => {
    expect(
      pipe(
        [10, 20, 30],
        map((value, index) => value + index)
      )
    ).toEqual([10, 21, 32]);
  });

  it('returns a new array and does not mutate the input', () => {
    const input = [1, 2, 3];
    const result = pipe(
      input,
      map(x => x * 2)
    );

    expect(result).not.toBe(input);
    expect(input).toEqual([1, 2, 3]);
  });

  it('returns an empty array for empty input', () => {
    expect(
      pipe(
        [] as number[],
        map(x => x * 2)
      )
    ).toEqual([]);
  });

  it('changes the element type', () => {
    expect(
      pipe(
        [1, 2, 3],
        map(x => `#${x}`)
      )
    ).toEqual(['#1', '#2', '#3']);
  });

  it('evaluates lazily and only maps the elements kept by a trailing take', () => {
    const spy = vi.fn((x: number) => x * 10);

    const result = pipe([1, 2, 3, 4, 5], map(spy), take(2));

    expect(result).toEqual([10, 20]);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
