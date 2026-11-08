import { sumBy as sumByToolkit } from 'es-toolkit';
import { sumBy as sumByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('sumBy', () => {
  bench('es-toolkit/sumBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    sumByToolkit(items, x => x.a);
  });

  bench('es-toolkit/compat/sumBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    sumByToolkitCompat(items, x => x.a);
  });

  bench('lodash/sumBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    lodash.sumBy(items, x => x.a);
  });
});

group('sumBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ a: i }));

  bench('es-toolkit/sumBy', () => {
    sumByToolkit(largeArray, x => x.a);
  });

  bench('es-toolkit/compat/sumBy', () => {
    sumByToolkitCompat(largeArray, x => x.a);
  });

  bench('lodash/sumBy', () => {
    lodash.sumBy(largeArray, x => x.a);
  });
});
