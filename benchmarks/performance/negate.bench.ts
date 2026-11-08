import { negate as negateToolkit } from 'es-toolkit';
import { negate as negateCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('compact', () => {
  bench('es-toolkit', () => {
    do_not_optimize(negateToolkit(() => true)());
  });

  bench('es-toolkit/compat', () => {
    do_not_optimize(negateCompatToolkit(() => true)());
  });

  bench('lodash', () => {
    do_not_optimize(lodash.negate(() => true)());
  });
});
