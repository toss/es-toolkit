import { isInteger as isIntegerToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isInteger', () => {
  bench('es-toolkit/isInteger', () => {
    const vals = [1, 1.1, '1', [], {}, () => false, Infinity];
    for (let i = 0; i < vals.length; i++) {
      do_not_optimize(isIntegerToolkit(vals[i]));
    }
  });

  bench('lodash/isInteger', () => {
    const vals = [1, 1.1, '1', [], {}, () => false, Infinity];
    for (let i = 0; i < vals.length; i++) {
      do_not_optimize(lodash.isInteger(vals[i]));
    }
  });
});
