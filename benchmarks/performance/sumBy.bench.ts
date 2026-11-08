import { sumBy as sumByToolkit } from 'es-toolkit';
import { sumBy as sumByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('sumBy', () => {
  bench('es-toolkit/sumBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    do_not_optimize(sumByToolkit(items, x => x.a));
  });

  bench('es-toolkit/compat/sumBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    do_not_optimize(sumByToolkitCompat(items, x => x.a));
  });

  bench('lodash/sumBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    do_not_optimize(lodash.sumBy(items, x => x.a));
  });
});

group('sumBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ a: i }));

  bench('es-toolkit/sumBy', () => {
    do_not_optimize(sumByToolkit(largeArray, x => x.a));
  });

  bench('es-toolkit/compat/sumBy', () => {
    do_not_optimize(sumByToolkitCompat(largeArray, x => x.a));
  });

  bench('lodash/sumBy', () => {
    do_not_optimize(lodash.sumBy(largeArray, x => x.a));
  });
});
