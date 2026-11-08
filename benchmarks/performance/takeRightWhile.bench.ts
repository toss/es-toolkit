import { takeRightWhile as takeRightWhileToolkit } from 'es-toolkit';
import { takeRightWhile as takeRightWhileCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('takeRightWhile', () => {
  bench('es-toolkit/takeRightWhile', () => {
    takeRightWhileToolkit([5, 4, 3, 2, 1], n => n < 4);
  });

  bench('es-toolkit/compat/takeRightWhile', () => {
    takeRightWhileCompatToolkit([5, 4, 3, 2, 1], n => n < 4);
  });

  bench('lodash/takeRightWhile', () => {
    lodash.takeRightWhile([5, 4, 3, 2, 1], n => n < 4);
  });
});

group('takeRightWhile/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/takeRightWhile', () => {
    takeRightWhileToolkit(largeArray, n => n < 100);
  });

  bench('es-toolkit/compat/takeRightWhile', () => {
    takeRightWhileCompatToolkit(largeArray, n => n < 100);
  });

  bench('lodash/takeRightWhile', () => {
    lodash.takeRightWhile(largeArray, n => n < 100);
  });
});
