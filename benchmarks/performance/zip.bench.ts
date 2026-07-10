import { bench, describe } from 'vitest';
import { zip as zipToolkit } from 'es-toolkit';
import { zip as zipToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { zip: zipLodash } = lodash;

describe('zip', () => {
  bench('es-toolkit/zip', () => {
    zipToolkit([1, 2, 3, 4], [3, 4, 5, 6]);
  });

  bench('es-toolkit/compat/zip', () => {
    zipToolkitCompat([1, 2, 3, 4], [3, 4, 5, 6]);
  });

  bench('lodash/zip', () => {
    zipLodash([1, 2, 3, 4], [3, 4, 5, 6]);
  });
});

describe('zip/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/zip', () => {
    zipToolkit(largeArray, largeArray);
  });

  bench('es-toolkit/compat/zip', () => {
    zipToolkitCompat(largeArray, largeArray);
  });

  bench('lodash/zip', () => {
    zipLodash(largeArray, largeArray);
  });
});
