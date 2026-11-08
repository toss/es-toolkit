import { defaults as defaultsToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('defaults', () => {
  bench('es-toolkit/compat/defaults', () => {
    do_not_optimize(defaultsToolkitCompat({ a: 1 }, { a: 2, b: 2 }));
    do_not_optimize(defaultsToolkitCompat({ a: 1, b: 2 }, { b: 3 }, { c: 3 }));
  });

  bench('lodash/defaults', () => {
    do_not_optimize(lodash.defaults({ a: 1 }, { a: 2, b: 2 }));
    do_not_optimize(lodash.defaults({ a: 1, b: 2 }, { b: 3 }, { c: 3 }));
  });
});
