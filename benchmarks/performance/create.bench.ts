import { create as createToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('create', () => {
  bench('es-toolkit/compat/create', () => {
    do_not_optimize(createToolkitCompat({ a: 1 }, { b: 2 }));
  });

  bench('lodash/create', () => {
    do_not_optimize(lodash.create({ a: 1 }, { b: 2 }));
  });
});
