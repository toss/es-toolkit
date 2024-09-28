import { bench, describe } from 'vitest';
import { isSafeInteger as isSafeIntegerToolkit } from 'es-toolkit/compat';
import { isSafeInteger as isSafeIntegerLodash } from 'lodash';

describe('after', () => {
  bench('es-toolkit/isSafeInteger', () => {
    const vals = [1, 1.1, '1', [], {}, () => false, Infinity, Number.MAX_SAFE_INTEGER + 1, Number.MIN_SAFE_INTEGER - 1];
    for (let i = 0; i < vals.length; i++) {
      isSafeIntegerToolkit(vals[i]);
    }
  });

  bench('lodash/isSafeInteger', () => {
    const vals = [1, 1.1, '1', [], {}, () => false, Infinity, Number.MAX_SAFE_INTEGER + 1, Number.MIN_SAFE_INTEGER - 1];
    for (let i = 0; i < vals.length; i++) {
      isSafeIntegerLodash(vals[i]);
    }
  });
});
