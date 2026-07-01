import { describe, expect, it } from 'vitest';
import { head } from './head.ts';

describe('head', () => {
  it('returns the first element', () => {
    expect(head([1, 2, 3].values())).toBe(1);
  });

  it('returns undefined for an empty source', () => {
    expect(head([].values())).toBeUndefined();
  });

  it('reads only a single element from the source', () => {
    const pulled: number[] = [];
    function* source() {
      for (const value of [1, 2, 3]) {
        pulled.push(value);
        yield value;
      }
    }

    expect(head(source())).toBe(1);
    expect(pulled).toEqual([1]);
  });

  it('reads the first element of an infinite source', () => {
    let n = 0;
    const infinite: Iterator<number> = { next: () => ({ value: n++, done: false }) };

    expect(head(infinite)).toBe(0);
  });

  it('returns the first element after a lazy chain', () => {
    expect(head([1, 2, 3, 4].values().filter(x => x % 2 === 0))).toBe(2);
  });
});
