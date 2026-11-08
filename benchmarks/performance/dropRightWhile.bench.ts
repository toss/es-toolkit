import { dropRightWhile as dropRightWhileToolkit } from 'es-toolkit';
import { dropRightWhile as dropRightWhileToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('dropRightWhile', () => {
  bench('es-toolkit/dropRightWhile', () => {
    dropRightWhileToolkit([1.2, 2.3, 3.4], x => x < 2);
  });

  bench('es-toolkit (compat)/dropRightWhile', () => {
    dropRightWhileToolkitCompat([1.2, 2.3, 3.4], x => x < 2);
  });

  bench('lodash/dropRightWhile', () => {
    lodash.dropRightWhile([1.2, 2.3, 3.4], x => x < 2);
  });
});

group('dropRightWhile/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/dropRightWhile', () => {
    dropRightWhileToolkit(largeArray, x => x < 5000);
  });

  bench('es-toolkit (compat)/dropRightWhile', () => {
    dropRightWhileToolkitCompat(largeArray, x => x < 5000);
  });

  bench('lodash/dropRightWhile', () => {
    lodash.dropRightWhile(largeArray, x => x < 5000);
  });
});
