import { head as headToolkit } from 'es-toolkit';
import { head as headCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('head', () => {
  bench('es-toolkit/head', () => {
    headToolkit([1, 2, 3, 4]);
  });

  bench('es-toolkit/compat/head', () => {
    headCompatToolkit([1, 2, 3, 4]);
  });

  bench('lodash/head', () => {
    lodash.head([1, 2, 3, 4]);
  });
});

group('head/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/head', () => {
    headToolkit(largeArray);
  });

  bench('es-toolkit/compat/head', () => {
    headCompatToolkit(largeArray);
  });

  bench('lodash/head', () => {
    lodash.head(largeArray);
  });
});
