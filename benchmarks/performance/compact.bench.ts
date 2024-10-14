import { compact as compactToolkit } from 'es-toolkit';
import { compact as compactToolkitCompat } from 'es-toolkit/compat';
import { compact as compactLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('compact', () => {
  bench('es-toolkit', () => {
    compactToolkit([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
  });

  bench('es-toolkit/compat', () => {
    compactToolkitCompat([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
  });

  bench('lodash', () => {
    compactLodash([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
  });
});

describe('compact/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => (i % 10 === 0 ? undefined : i));

  bench('es-toolkit', () => {
    compactToolkit(largeArray);
  });

  bench('es-toolkit/compat', () => {
    compactToolkitCompat(largeArray);
  });

  bench('lodash', () => {
    compactLodash(largeArray);
  });
});
