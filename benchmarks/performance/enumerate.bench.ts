import { bench, describe } from 'vitest';
import { enumerate as enumerateEsToolkit_ } from 'es-toolkit/iterator';
import { zipWithIndex as zipWithIndexFxts_ } from '@fxts/core';

const enumerateEsToolkit = enumerateEsToolkit_;
const zipWithIndexFxts = zipWithIndexFxts_;

describe('enumerate', () => {
  bench('es-toolkit/enumerate', () => {
    const iter = enumerateEsToolkit(['a', 'b', 'c']);
    for (const _ of iter) {
      /* consume */
    }
  });

  bench('@fxts/core/zipWithIndex', () => {
    const iter = zipWithIndexFxts(['a', 'b', 'c']);
    for (const _ of iter) {
      /* consume */
    }
  });

  bench('Array.prototype.entries (native)', () => {
    const arr = ['a', 'b', 'c'];
    for (const _ of arr.entries()) {
      /* consume */
    }
  });

  bench('forEach with index (native)', () => {
    const arr = ['a', 'b', 'c'];
    arr.forEach((_, __) => {
      /* consume */
    });
  });
});

describe('enumerate/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => String(i));

  bench('es-toolkit/enumerate', () => {
    const iter = enumerateEsToolkit(largeArray);
    for (const _ of iter) {
      /* consume */
    }
  });

  bench('@fxts/core/zipWithIndex', () => {
    const iter = zipWithIndexFxts(largeArray);
    for (const _ of iter) {
      /* consume */
    }
  });

  bench('Array.prototype.entries (native)', () => {
    for (const _ of largeArray.entries()) {
      /* consume */
    }
  });

  bench('forEach with index (native)', () => {
    largeArray.forEach((_, __) => {
      /* consume */
    });
  });
});
