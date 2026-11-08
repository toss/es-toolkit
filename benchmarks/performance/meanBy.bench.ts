import { meanBy as meanByToolkit } from 'es-toolkit';
import { meanBy as meanByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('meanBy', () => {
  bench('es-toolkit/meanBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    meanByToolkit(items, x => x.a);
  });

  bench('es-toolkit/compat/meanBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    meanByToolkitCompat(items, x => x.a);
  });

  bench('lodash/meanBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    lodash.meanBy(items, x => x.a);
  });
});

group('meanBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ a: i }));

  bench('es-toolkit/meanBy', () => {
    meanByToolkit(largeArray, x => x.a);
  });

  bench('es-toolkit/compat/meanBy', () => {
    meanByToolkitCompat(largeArray, x => x.a);
  });

  bench('lodash/meanBy', () => {
    lodash.meanBy(largeArray, x => x.a);
  });
});
