import { head as headToolkit } from 'es-toolkit';
import { head as headCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('head', () => {
  bench('es-toolkit/head', () => {
    do_not_optimize(headToolkit([1, 2, 3, 4]));
  });

  bench('es-toolkit/compat/head', () => {
    do_not_optimize(headCompatToolkit([1, 2, 3, 4]));
  });

  bench('lodash/head', () => {
    do_not_optimize(lodash.head([1, 2, 3, 4]));
  });
});

group('head/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/head', () => {
    do_not_optimize(headToolkit(largeArray));
  });

  bench('es-toolkit/compat/head', () => {
    do_not_optimize(headCompatToolkit(largeArray));
  });

  bench('lodash/head', () => {
    do_not_optimize(lodash.head(largeArray));
  });
});
