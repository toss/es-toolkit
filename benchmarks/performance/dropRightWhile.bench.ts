import { dropRightWhile as dropRightWhileToolkit } from 'es-toolkit';
import { dropRightWhile as dropRightWhileToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('dropRightWhile', () => {
  bench('es-toolkit/dropRightWhile', () => {
    do_not_optimize(dropRightWhileToolkit([1.2, 2.3, 3.4], x => x < 2));
  });

  bench('es-toolkit (compat)/dropRightWhile', () => {
    do_not_optimize(dropRightWhileToolkitCompat([1.2, 2.3, 3.4], x => x < 2));
  });

  bench('lodash/dropRightWhile', () => {
    do_not_optimize(lodash.dropRightWhile([1.2, 2.3, 3.4], x => x < 2));
  });
});

group('dropRightWhile/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/dropRightWhile', () => {
    do_not_optimize(dropRightWhileToolkit(largeArray, x => x < 5000));
  });

  bench('es-toolkit (compat)/dropRightWhile', () => {
    do_not_optimize(dropRightWhileToolkitCompat(largeArray, x => x < 5000));
  });

  bench('lodash/dropRightWhile', () => {
    do_not_optimize(lodash.dropRightWhile(largeArray, x => x < 5000));
  });
});
