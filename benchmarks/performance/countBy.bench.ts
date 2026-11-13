import { countBy as countByToolkit } from 'es-toolkit';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('countBy', () => {
  bench('es-toolkit/countBy', () => {
    do_not_optimize(
      countByToolkit([1.2, 2.4, 3.6, 2.2, 3.4, 3.6], (item: number) => {
        return Math.floor(item).toString();
      })
    );
  });

  bench('lodash/countBy', () => {
    do_not_optimize(
      lodash.countBy([1.2, 2.4, 3.6, 2.2, 3.4, 3.6], (item: number) => {
        return Math.floor(item).toString();
      })
    );
  });
});

group('countBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i + 0.5);

  bench('es-toolkit/countBy', () => {
    do_not_optimize(
      countByToolkit(largeArray, (item: number) => {
        return Math.floor(item).toString();
      })
    );
  });

  bench('lodash/countBy', () => {
    do_not_optimize(
      lodash.countBy(largeArray, (item: number) => {
        return Math.floor(item).toString();
      })
    );
  });
});
