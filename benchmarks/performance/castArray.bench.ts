import { castArray as castArrayToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('castArray', () => {
  bench('es-toolkit/castArray', () => {
    do_not_optimize(castArrayToolkit(1));
    do_not_optimize(castArrayToolkit([1]));
    do_not_optimize(castArrayToolkit());
  });

  bench('lodash/castArray', () => {
    do_not_optimize(lodash.castArray(1));
    do_not_optimize(lodash.castArray([1]));
    do_not_optimize(lodash.castArray());
  });
});
