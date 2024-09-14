import { bench, describe } from 'vitest';
import { castArray as castArrayToolkit } from 'es-toolkit/compat';
import { castArray as castArrayLodash } from 'lodash';

describe('castArray function performance comparison', () => {
  bench('es-toolkit/castArray', () => {
    castArrayToolkit(1);
    castArrayToolkit([1]);
    castArrayToolkit();
  });

  bench('lodash/castArray', () => {
    castArrayLodash(1);
    castArrayLodash([1]);
    castArrayLodash();
  });
});
