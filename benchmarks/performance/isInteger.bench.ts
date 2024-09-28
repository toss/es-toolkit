import { bench, describe } from 'vitest';
import { isInteger as isIntegerToolkit } from 'es-toolkit/compat';
import { isInteger as isIntegerLodash } from 'lodash';

describe('isInteger', () => {
  bench('es-toolkit/isInteger', () => {
    const vals = [1, 1.1, '1', [], {}, () => false, Infinity];
    for (let i = 0; i < vals.length; i++) {
      isIntegerToolkit(vals[i]);
    }
  });

  bench('lodash/isInteger', () => {
    const vals = [1, 1.1, '1', [], {}, () => false, Infinity];
    for (let i = 0; i < vals.length; i++) {
      isIntegerLodash(vals[i]);
    }
  });
});
