import { dropWhile as dropWhileToolkit } from 'es-toolkit';
import { dropWhile as dropWhileToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('dropWhile', () => {
  bench('es-toolkit/dropWhile', () => {
    do_not_optimize(dropWhileToolkit([1.2, 2.3, 3.4], x => x < 2));
  });

  bench('es-toolkit/compat/dropWhile', () => {
    do_not_optimize(dropWhileToolkitCompat([1.2, 2.3, 3.4], x => x < 2));
  });

  bench('lodash/dropWhile', () => {
    do_not_optimize(lodash.dropWhile([1.2, 2.3, 3.4], x => x < 2));
  });
});

group('dropWhile/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/dropWhile', () => {
    do_not_optimize(dropWhileToolkit(largeArray, x => x < 5000));
  });

  bench('es-toolkit/compat/dropWhile', () => {
    do_not_optimize(dropWhileToolkitCompat(largeArray, x => x < 5000));
  });

  bench('lodash/dropWhile', () => {
    do_not_optimize(lodash.dropWhile(largeArray, x => x < 5000));
  });
});
