import { bench, describe } from 'vitest';
import { zipIterable as zipIterableEsToolkit_ } from 'es-toolkit/iterator';
import { izip as zipItertools_ } from 'itertools';
import { zip as zipFxts_ } from '@fxts/core';

const zipIterableEsToolkit = zipIterableEsToolkit_;
const zipFxts = zipFxts_;
const zipItertools = zipItertools_;

describe('zipIterable', () => {
  bench('es-toolkit/zipIterable', () => {
    const iter = zipIterableEsToolkit([1, 2, 3], ['a', 'b', 'c']);
    for (const _ of iter) {
      /* consume */
    }
  });

  bench('@fxts/core/zip', () => {
    const iter = zipFxts([1, 2, 3], ['a', 'b', 'c']);
    for (const _ of iter) {
      /* consume */
    }
  });

  bench('itertools/izip', () => {
    const iter = zipItertools([1, 2, 3], ['a', 'b', 'c']);
    for (const _ of iter) {
      /* consume */
    }
  });
});

describe('zipIterable/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/zipIterable', () => {
    const iter = zipIterableEsToolkit(largeArray, largeArray);
    for (const _ of iter) {
      /* consume */
    }
  });

  bench('@fxts/core/zip', () => {
    const iter = zipFxts(largeArray, largeArray);
    for (const _ of iter) {
      /* consume */
    }
  });

  bench('itertools/izip', () => {
    const iter = zipItertools(largeArray, largeArray);
    for (const _ of iter) {
      /* consume */
    }
  });
});
