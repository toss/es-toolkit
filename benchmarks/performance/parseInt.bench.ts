import { parseInt as parseIntToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('parseInt', () => {
  bench('es-toolkit/parseInt', () => {
    do_not_optimize(parseIntToolkit('10'));
  });

  bench('lodash/parseInt', () => {
    do_not_optimize(lodash.parseInt('10'));
  });
});
