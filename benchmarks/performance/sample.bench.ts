import { sample as sampleToolkit } from 'es-toolkit';
import { sample as sampleToolkitCompat } from 'es-toolkit/compat';
import { sample as sampleLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('sample', () => {
  bench('es-toolkit/sample', () => {
    const array = [1, 2, 3, 4, 5];
    sampleToolkit(array);
  });

  bench('es-toolkit/compat/sample', () => {
    const array = [1, 2, 3, 4, 5];
    sampleToolkitCompat(array);
  });

  bench('lodash/sample', () => {
    const array = [1, 2, 3, 4, 5];
    sampleLodash(array);
  });
});

describe('sample/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/sample', () => {
    sampleToolkit(largeArray);
  });

  bench('es-toolkit/compat/sample', () => {
    sampleToolkitCompat(largeArray);
  });

  bench('lodash/sample', () => {
    sampleLodash(largeArray);
  });
});
