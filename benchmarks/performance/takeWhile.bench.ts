import { takeWhile as takeWhileToolkit } from 'es-toolkit';
import { takeWhile as takeWhileLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('takeWhile', () => {
  bench('es-toolkit/takeWhile', () => {
    takeWhileToolkit([5, 4, 3, 2, 1], n => n < 4);
  });

  bench('lodash/takeWhile', () => {
    takeWhileLodash([5, 4, 3, 2, 1], n => n < 4);
  });
});

describe('takeWhile/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/takeWhile', () => {
    takeWhileToolkit(largeArray, n => n < 100);
  });

  bench('lodash/takeWhile', () => {
    takeWhileLodash(largeArray, n => n < 100);
  });
});
