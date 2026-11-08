import { compact as compactToolkit } from 'es-toolkit';
import { compact as compactToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('compact', () => {
  bench('es-toolkit', () => {
    do_not_optimize(compactToolkit([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]));
  });

  bench('es-toolkit/compat', () => {
    do_not_optimize(compactToolkitCompat([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]));
  });

  bench('lodash', () => {
    do_not_optimize(lodash.compact([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]));
  });
});

group('compact/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => (i % 10 === 0 ? undefined : i));

  bench('es-toolkit', () => {
    do_not_optimize(compactToolkit(largeArray));
  });

  bench('es-toolkit/compat', () => {
    do_not_optimize(compactToolkitCompat(largeArray));
  });

  bench('lodash', () => {
    do_not_optimize(lodash.compact(largeArray));
  });
});
