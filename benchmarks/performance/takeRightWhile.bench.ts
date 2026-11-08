import { takeRightWhile as takeRightWhileToolkit } from 'es-toolkit';
import { takeRightWhile as takeRightWhileCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('takeRightWhile', () => {
  bench('es-toolkit/takeRightWhile', () => {
    do_not_optimize(takeRightWhileToolkit([5, 4, 3, 2, 1], n => n < 4));
  });

  bench('es-toolkit/compat/takeRightWhile', () => {
    do_not_optimize(takeRightWhileCompatToolkit([5, 4, 3, 2, 1], n => n < 4));
  });

  bench('lodash/takeRightWhile', () => {
    do_not_optimize(lodash.takeRightWhile([5, 4, 3, 2, 1], n => n < 4));
  });
});

group('takeRightWhile/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/takeRightWhile', () => {
    do_not_optimize(takeRightWhileToolkit(largeArray, n => n < 100));
  });

  bench('es-toolkit/compat/takeRightWhile', () => {
    do_not_optimize(takeRightWhileCompatToolkit(largeArray, n => n < 100));
  });

  bench('lodash/takeRightWhile', () => {
    do_not_optimize(lodash.takeRightWhile(largeArray, n => n < 100));
  });
});
