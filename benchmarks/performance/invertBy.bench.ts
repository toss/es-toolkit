import { invertBy as invertByWithCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const object = { a: 1, b: 2, c: 1, d: 4 };

group('invertBy', () => {
  bench('lodash/invertBy', () => {
    do_not_optimize(lodash.invertBy(object));
  });

  bench('es-toolkit/compat/invertBy', () => {
    do_not_optimize(invertByWithCompatToolkit(object));
  });
});
