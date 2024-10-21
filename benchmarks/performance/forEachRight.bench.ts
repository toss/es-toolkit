import { forEachRight as forEachRightToolkit } from 'es-toolkit';
import { forEachRight as forEachRightLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('forEachRight', () => {
  bench('es-toolkit/forEachRight', () => {
    forEachRightToolkit([1, 2, 3, 4, 5, 6], x => x + 3);
  });

  bench('lodash/forEachRight', () => {
    forEachRightLodash([1, 2, 3, 4, 5, 6], x => x + 3);
  });
});

describe('forEachRight/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/forEachRight', () => {
    forEachRightToolkit(largeArray, x => x + 3);
  });

  bench('lodash/forEachRight', () => {
    forEachRightLodash(largeArray, x => x + 3);
  });
});
