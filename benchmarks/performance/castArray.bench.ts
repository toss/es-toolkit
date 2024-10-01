import { bench, describe } from 'vitest';
import { castArray as castArrayToolkit_ } from 'es-toolkit/compat';
import { castArray as castArrayLodash_ } from 'lodash';

const castArrayToolkit = castArrayToolkit_;
const castArrayLodash = castArrayLodash_;

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
