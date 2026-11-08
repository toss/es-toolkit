import { isSafeInteger as isSafeIntegerToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('after', () => {
  bench('es-toolkit/isSafeInteger', () => {
    const vals = [1, 1.1, '1', [], {}, () => false, Infinity, Number.MAX_SAFE_INTEGER + 1, Number.MIN_SAFE_INTEGER - 1];
    for (let i = 0; i < vals.length; i++) {
      isSafeIntegerToolkit(vals[i]);
    }
  });

  bench('lodash/isSafeInteger', () => {
    const vals = [1, 1.1, '1', [], {}, () => false, Infinity, Number.MAX_SAFE_INTEGER + 1, Number.MIN_SAFE_INTEGER - 1];
    for (let i = 0; i < vals.length; i++) {
      lodash.isSafeInteger(vals[i]);
    }
  });
});
