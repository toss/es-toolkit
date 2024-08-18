import { describe, expect, it } from 'vitest';
import { isMapMatch } from './isMapMatch';

describe('isMapMatch', () => {
  it('can match maps', () => {
    expect(
      isMapMatch(
        new Map([
          ['a', 1],
          ['b', 2],
        ]),
        new Map([
          ['a', 1],
          ['b', 2],
        ])
      )
    ).toBe(true);

    expect(
      isMapMatch(
        new Map([
          ['a', 1],
          ['b', 2],
          ['c', 3],
        ]),
        new Map([
          ['a', 1],
          ['b', 2],
        ])
      )
    ).toBe(true);

    expect(
      isMapMatch(
        new Map([['b', 2]]),
        new Map([
          ['a', 1],
          ['b', 2],
        ])
      )
    ).toBe(false);

    expect(
      isMapMatch(
        new Map([
          ['a', 2],
          ['b', 2],
        ]),
        new Map([
          ['a', 1],
          ['b', 2],
        ])
      )
    ).toBe(false);
  });

  it('returns true if source is empty', () => {
    const map = new Map();

    expect(
      isMapMatch(
        new Map([
          ['a', 2],
          ['b', 2],
        ]),
        map
      )
    ).toBe(true);
    expect(isMapMatch(1, map)).toBe(true);
    expect(isMapMatch('a', map)).toBe(true);
    expect(isMapMatch(new Set(), map)).toBe(true);
    expect(isMapMatch([1, 2, 3], map)).toBe(true);
    expect(isMapMatch({ a: 1, b: 2 }, map)).toBe(true);
  });

  it('returns false if source is not empty and targets that are not maps', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    expect(isMapMatch(1, map)).toBe(false);
    expect(isMapMatch('a', map)).toBe(false);
    expect(isMapMatch(new Set(), map)).toBe(false);
    expect(isMapMatch([1, 2, 3], map)).toBe(false);
    expect(isMapMatch({ a: 1, b: 2 }, map)).toBe(false);
  });
});
