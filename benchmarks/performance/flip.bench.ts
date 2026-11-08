import { flip as flipToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('flip', () => {
  function fn(a: any, b: any, c: any, d: any) {
    return [a, b, c, d];
  }

  bench('es-toolkit/flip', () => {
    do_not_optimize(flipToolkit(fn));
  });

  bench('lodash/flip', () => {
    do_not_optimize(lodash.flip(fn));
  });
});
