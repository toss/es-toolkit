import { tail as tailToolkit } from 'es-toolkit';
import { tail as tailToolkitCompat } from 'es-toolkit/compat';
import { tail as tailLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('tail', () => {
  bench('es-toolkit/tail', () => {
    tailToolkit([1, 2, 3, 4]);
  });

  bench('es-toolkit/compat/tail', () => {
    tailToolkitCompat([1, 2, 3, 4]);
  });

  bench('lodash/tail', () => {
    tailLodash([1, 2, 3, 4]);
  });
});

describe('tail/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/tail', () => {
    tailToolkit(largeArray);
  });

  bench('es-toolkit/compat/tail', () => {
    tailToolkitCompat(largeArray);
  });

  bench('lodash/tail', () => {
    tailLodash(largeArray);
  });
});
