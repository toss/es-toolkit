import { meanBy as meanByToolkit } from 'es-toolkit';
import { meanBy as meanByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('meanBy', () => {
  bench('es-toolkit/meanBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    do_not_optimize(meanByToolkit(items, x => x.a));
  });

  bench('es-toolkit/compat/meanBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    do_not_optimize(meanByToolkitCompat(items, x => x.a));
  });

  bench('lodash/meanBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    do_not_optimize(lodash.meanBy(items, x => x.a));
  });
});

group('meanBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ a: i }));

  bench('es-toolkit/meanBy', () => {
    do_not_optimize(meanByToolkit(largeArray, x => x.a));
  });

  bench('es-toolkit/compat/meanBy', () => {
    do_not_optimize(meanByToolkitCompat(largeArray, x => x.a));
  });

  bench('lodash/meanBy', () => {
    do_not_optimize(lodash.meanBy(largeArray, x => x.a));
  });
});
