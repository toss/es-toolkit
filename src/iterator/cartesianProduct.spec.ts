import { describe, expect, it } from 'vitest';
import { cartesianProduct } from './cartesianProduct.ts';
import { range } from './range.ts';

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

describe('cartesianProduct', () => {
  it('yields every tuple in lexicographic order with the rightmost source advancing fastest', () => {
    expect(cartesianProduct([1, 2].values(), ['a', 'b'].values()).toArray()).toEqual([
      [1, 'a'],
      [1, 'b'],
      [2, 'a'],
      [2, 'b'],
    ]);
  });

  it('takes the product of more than two sources', () => {
    expect(cartesianProduct([0, 1].values(), [0, 1].values(), [0, 1].values()).toArray()).toEqual([
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, 0],
      [0, 1, 1],
      [1, 0, 0],
      [1, 0, 1],
      [1, 1, 0],
      [1, 1, 1],
    ]);
  });

  it('yields single-element tuples for a single source', () => {
    expect(cartesianProduct([1, 2, 3].values()).toArray()).toEqual([[1], [2], [3]]);
  });

  it('yields a single empty tuple when given no sources', () => {
    expect(cartesianProduct().toArray()).toEqual([[]]);
  });

  it('yields nothing when any source is empty', () => {
    expect(cartesianProduct([1, 2].values(), [].values()).toArray()).toEqual([]);
    expect(cartesianProduct([].values(), [1, 2].values()).toArray()).toEqual([]);
  });

  it('consumes the first source lazily, so it may be infinite', () => {
    expect(cartesianProduct(range(0, Infinity), ['a', 'b'].values()).take(5).toArray()).toEqual([
      [0, 'a'],
      [0, 'b'],
      [1, 'a'],
      [1, 'b'],
      [2, 'a'],
    ]);
  });

  it('does not touch any source until the first element is requested', () => {
    let pulled = false;
    function* source() {
      pulled = true;
      yield 1;
    }

    const it = cartesianProduct(source(), source());
    expect(pulled).toBe(false);

    it.next();
    expect(pulled).toBe(true);
  });

  it('is single-shot once consumed', () => {
    const it = cartesianProduct([1, 2].values(), ['a'].values());
    expect(it.toArray()).toEqual([
      [1, 'a'],
      [2, 'a'],
    ]);
    expect(it.toArray()).toEqual([]);
  });

  it('closes every source when the product is exhausted', () => {
    const first = closableSource([1, 2]);
    const second = closableSource(['a', 'b']);

    cartesianProduct(first.source, second.source).toArray();

    expect(first.isClosed()).toBe(true);
    expect(second.isClosed()).toBe(true);
  });

  it('closes every source when one of them is empty', () => {
    const first = closableSource([1, 2]);
    const second = closableSource([]);

    cartesianProduct(first.source, second.source).toArray();

    // `first` is never pulled, so its `finally` block cannot run; being done
    // after `return()` is what proves it was closed.
    expect(first.source.next()).toEqual({ value: undefined, done: true });
    expect(second.isClosed()).toBe(true);
  });

  it('closes every source when the consumer stops early', () => {
    const first = closableSource([1, 2, 3]);
    const second = closableSource(['a', 'b', 'c']);

    cartesianProduct(first.source, second.source).take(1).toArray();

    expect(first.isClosed()).toBe(true);
    expect(second.isClosed()).toBe(true);
  });
});
