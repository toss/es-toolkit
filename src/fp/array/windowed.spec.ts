import { describe, expect, it, vi } from 'vitest';
import { map } from './map.ts';
import { take } from './take.ts';
import { windowed } from './windowed.ts';
import { pipe } from '../pipe.ts';

describe('windowed', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3, 4], windowed(2))).toEqual([
      [1, 2],
      [2, 3],
      [3, 4],
    ]);
  });

  it('supports lazy evaluation for full windows', () => {
    const spy = vi.fn((value: number) => value);

    expect(pipe([1, 2, 3, 4], map(spy), windowed(2), take(1))).toEqual([[1, 2]]);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('keeps partial window mode eager to preserve trailing windows', () => {
    expect(pipe([1, 2, 3], windowed(2, 2, { partialWindows: true }))).toEqual([[1, 2], [3]]);
  });
});
