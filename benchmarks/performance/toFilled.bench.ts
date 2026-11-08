import { toFilled as toFilledToolkit } from 'es-toolkit';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('fill function performance comparison', () => {
  bench('es-toolkit/toFilled', () => {
    do_not_optimize(toFilledToolkit([1, 2, 3, 4, 5], '*'));
  });

  bench('lodash/fill', () => {
    do_not_optimize(lodash.fill([1, 2, 3, 4, 5], '*'));
  });
});

group('fill function performance with custom start and end', () => {
  bench('es-toolkit/toFilled', () => {
    do_not_optimize(toFilledToolkit([1, 2, 3, 4, 5], '*', 1, 3));
  });

  bench('lodash/fill', () => {
    do_not_optimize(lodash.fill([1, 2, 3, 4, 5], '*', 1, 3));
  });
});

group('fill function performance with large array', () => {
  const largeArray = Array.from({ length: 10000 }, (_, index) => index);

  bench('es-toolkit/toFilled', () => {
    do_not_optimize(toFilledToolkit(largeArray, '*'));
  });

  bench('lodash/fill', () => {
    do_not_optimize(lodash.fill(largeArray, '*'));
  });
});
