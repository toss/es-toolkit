import { takeWhile as takeWhileToolkit } from 'es-toolkit';
import { takeWhile as takeWhileCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('takeWhile', () => {
  bench('es-toolkit/takeWhile', () => {
    do_not_optimize(takeWhileToolkit([5, 4, 3, 2, 1], n => n < 4));
  });

  bench('es-toolkit/compat/takeWhile', () => {
    do_not_optimize(takeWhileCompatToolkit([5, 4, 3, 2, 1], n => n < 4));
  });

  bench('lodash/takeWhile', () => {
    do_not_optimize(lodash.takeWhile([5, 4, 3, 2, 1], n => n < 4));
  });
});

group('takeWhile/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/takeWhile', () => {
    do_not_optimize(takeWhileToolkit(largeArray, n => n < 100));
  });

  bench('es-toolkit/compat/takeWhile', () => {
    do_not_optimize(takeWhileCompatToolkit(largeArray, n => n < 100));
  });

  bench('lodash/takeWhile', () => {
    do_not_optimize(lodash.takeWhile(largeArray, n => n < 100));
  });
});
