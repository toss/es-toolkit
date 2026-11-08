import { tail as tailToolkit } from 'es-toolkit';
import { tail as tailToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('tail', () => {
  bench('es-toolkit/tail', () => {
    do_not_optimize(tailToolkit([1, 2, 3, 4]));
  });

  bench('es-toolkit/compat/tail', () => {
    do_not_optimize(tailToolkitCompat([1, 2, 3, 4]));
  });

  bench('lodash/tail', () => {
    do_not_optimize(lodash.tail([1, 2, 3, 4]));
  });
});

group('tail/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/tail', () => {
    do_not_optimize(tailToolkit(largeArray));
  });

  bench('es-toolkit/compat/tail', () => {
    do_not_optimize(tailToolkitCompat(largeArray));
  });

  bench('lodash/tail', () => {
    do_not_optimize(lodash.tail(largeArray));
  });
});
