import { castArray as castArrayToolkit } from 'es-toolkit/compat';
import { castArray as castArrayLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('castArray', () => {
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
