import { bench, describe } from 'vitest';
import { chain as chainEsToolkit_ } from 'es-toolkit/iterator';
import { chain as chainItertools_ } from 'itertools';

const chainEsToolkit = chainEsToolkit_;
const chainItertools = chainItertools_;

describe('chain', () => {
  bench('es-toolkit/chain', () => {
    const iter = chainEsToolkit([1, 2, 3], [4, 5, 6], [7, 8, 9]);
    for (const _ of iter) {
      /* consume */
    }
  });

  bench('itertools/ichain', () => {
    const iter = chainItertools([1, 2, 3], [4, 5, 6], [7, 8, 9]);
    for (const _ of iter) {
      /* consume */
    }
  });

  bench('native spread', () => {
    const iter = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ].flat();
    for (const _ of iter) {
      /* consume */
    }
  });
});

describe('chain/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/chain', () => {
    const iter = chainEsToolkit(largeArray, largeArray, largeArray);
    for (const _ of iter) {
      /* consume */
    }
  });

  bench('itertools/ichain', () => {
    const iter = chainItertools(largeArray, largeArray, largeArray);
    for (const _ of iter) {
      /* consume */
    }
  });

  bench('native spread', () => {
    const iter = [...largeArray, ...largeArray, ...largeArray];
    for (const _ of iter) {
      /* consume */
    }
  });
});
