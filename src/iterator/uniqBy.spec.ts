import { describe, expect, it } from 'vitest';
import { uniqBy } from './uniqBy.ts';

describe('uniqBy', () => {
  it('keeps the first element for each mapped key', () => {
    expect(uniqBy([1.1, 1.2, 2.3, 2.4].values(), Math.floor).toArray()).toEqual([1.1, 2.3]);
  });

  it('uses SameValueZero so NaN keys dedupe', () => {
    expect(uniqBy([NaN, NaN, 1].values(), x => x).toArray()).toEqual([NaN, 1]);
  });

  it('deduplicates objects by a derived key', () => {
    const data = [
      { id: 1, v: 'a' },
      { id: 1, v: 'b' },
      { id: 2, v: 'c' },
    ];
    expect(uniqBy(data.values(), x => x.id).toArray()).toEqual([
      { id: 1, v: 'a' },
      { id: 2, v: 'c' },
    ]);
  });

  it('streams: emits a unique element before consuming the rest', () => {
    let n = 0;
    const infinite: Iterator<number> = { next: () => ({ value: n++, done: false }) };

    expect(
      uniqBy(infinite, x => x % 3)
        .take(3)
        .toArray()
    ).toEqual([0, 1, 2]);
  });

  it('is single-shot once consumed', () => {
    const it = uniqBy([1, 1, 2].values(), x => x);
    expect(it.toArray()).toEqual([1, 2]);
    expect(it.toArray()).toEqual([]);
  });
});
