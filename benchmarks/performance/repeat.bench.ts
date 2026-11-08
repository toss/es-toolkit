import { repeat as repeatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('repeat', () => {
  bench('es-toolkit/repeat', () => {
    do_not_optimize(repeatToolkit('abc', 2));
  });

  bench('lodash/repeat', () => {
    do_not_optimize(lodash.repeat('abc', 2));
  });
});
