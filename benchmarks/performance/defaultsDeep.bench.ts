import { defaultsDeep as defaultsDeepToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('defaultsDeep', () => {
  bench('es-toolkit/compat/defaultsDeep ', () => {
    do_not_optimize(defaultsDeepToolkitCompat({ a: 1 }, { a: 2, b: 2 }));
    do_not_optimize(defaultsDeepToolkitCompat({ a: 1, b: 2 }, { b: 3 }, { c: 3 }));
  });

  bench('lodash/defaultsDeep', () => {
    do_not_optimize(lodash.defaultsDeep({ a: 1 }, { a: 2, b: 2 }));
    do_not_optimize(lodash.defaultsDeep({ a: 1, b: 2 }, { b: 3 }, { c: 3 }));
  });
});
