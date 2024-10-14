import { at as atToolkit } from 'es-toolkit';
import { at as atLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('at', () => {
  bench('es-toolkit/at', () => {
    atToolkit(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
  });

  bench('lodash/at', () => {
    atLodash(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
  });
});

describe('at/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);
  const largeIndex = Array.from({ length: 1000 }, (_, i) => i * 2);

  bench('es-toolkit/at', () => {
    atToolkit(largeArray, largeIndex);
  });

  bench('lodash/at', () => {
    atLodash(largeArray, largeIndex);
  });
});
