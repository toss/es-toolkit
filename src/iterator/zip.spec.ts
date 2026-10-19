import { describe, expect, it } from 'vitest';
import { zip } from './zip.ts';

function closableSource<T>(values: readonly T[]) {
  let closed = false;
  function* generate() {
    try {
      yield* values;
    } finally {
      closed = true;
    }
  }
  return { source: generate(), isClosed: () => closed };
}

describe('zip', () => {
  it('pairs elements at matching positions', () => {
    expect(zip([1, 2, 3].values(), ['a', 'b', 'c'].values()).toArray()).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });

  it('stops at the shortest source', () => {
    expect(zip([1, 2, 3].values(), ['a', 'b'].values()).toArray()).toEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
  });

  it('zips more than two sources', () => {
    expect(zip([1, 2].values(), ['a', 'b'].values(), [true, false].values()).toArray()).toEqual([
      [1, 'a', true],
      [2, 'b', false],
    ]);
  });

  it('yields nothing when given no sources', () => {
    expect(zip().toArray()).toEqual([]);
  });

  it('terminates when zipped with a finite source even if the other is infinite', () => {
    let n = 0;
    const infinite: Iterator<number> = { next: () => ({ value: n++, done: false }) };

    expect(zip(infinite, ['a', 'b'].values()).toArray()).toEqual([
      [0, 'a'],
      [1, 'b'],
    ]);
  });

  it('is single-shot once consumed', () => {
    const it = zip([1, 2].values(), ['a', 'b'].values());
    expect(it.toArray()).toEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
    expect(it.toArray()).toEqual([]);
  });

  it('closes the remaining sources when the shortest one is exhausted', () => {
    const long = closableSource([1, 2, 3, 4]);

    zip(long.source, ['a'].values()).toArray();

    expect(long.isClosed()).toBe(true);
  });

  it('closes every source when the consumer stops early', () => {
    const first = closableSource([1, 2, 3]);
    const second = closableSource(['a', 'b', 'c']);

    zip(first.source, second.source).take(1).toArray();

    expect(first.isClosed()).toBe(true);
    expect(second.isClosed()).toBe(true);
  });
});
