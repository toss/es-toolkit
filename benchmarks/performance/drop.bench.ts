import { drop as dropToolkit } from 'es-toolkit';
import { drop as dropCompatToolkit } from 'es-toolkit/compat';
import { drop as dropLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('drop', () => {
  bench('es-toolkit/drop', () => {
    dropToolkit([1, 2, 3, 4, 5, 6], 3);
  });

  bench('es-toolkit/compat/drop', () => {
    dropCompatToolkit([1, 2, 3, 4, 5, 6], 3);
  });

  bench('lodash/drop', () => {
    dropLodash([1, 2, 3, 4, 5, 6], 3);
  });
});

describe('drop/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/drop', () => {
    dropToolkit(largeArray, 5000);
  });

  bench('es-toolkit/compat/drop', () => {
    dropCompatToolkit(largeArray, 5000);
  });

  bench('lodash/drop', () => {
    dropLodash(largeArray, 5000);
  });
});
