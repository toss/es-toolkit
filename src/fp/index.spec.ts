import { describe, expect, it } from 'vitest';
import { add, chunk, filter, map, multiply, omit, pick, pipe, sortBy, take, uniq } from './index.ts';

describe('es-toolkit/fp', () => {
  it('exports pipe and every v1 operator from the public entry', () => {
    for (const fn of [pipe, map, filter, take, uniq, chunk, sortBy, multiply, add, pick, omit]) {
      expect(typeof fn).toBe('function');
    }
  });

  it('runs the flagship example via the public entry', () => {
    expect(pipe([1, 2, 3], map(multiply(3)))).toEqual([3, 6, 9]);
  });

  it('composes operators lazily through the public entry', () => {
    expect(
      pipe(
        [1, 2, 3, 4, 5, 6],
        filter(x => x % 2 === 0),
        map(add(1)),
        take(2)
      )
    ).toEqual([3, 5]);
  });
});
