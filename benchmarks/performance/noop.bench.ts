import { noop as noopToolkit } from 'es-toolkit';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('noop', () => {
  bench('es-toolkit/noop', () => {
    do_not_optimize(noopToolkit());
  });

  bench('lodash/noop', () => {
    do_not_optimize(lodash.noop());
  });
});
