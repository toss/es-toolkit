import { defer as deferToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('defer', () => {
  bench('es-toolkit/defer', () => {
    const id = deferToolkit(() => {});
    do_not_optimize(clearTimeout(id));
  });

  bench('lodash/defer', () => {
    const id = lodash.defer(() => {});
    do_not_optimize(clearTimeout(id));
  });
});
