import { castArray as castArrayToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('castArray', () => {
  bench('es-toolkit/castArray', () => {
    castArrayToolkit(1);
    castArrayToolkit([1]);
    castArrayToolkit();
  });

  bench('lodash/castArray', () => {
    lodash.castArray(1);
    lodash.castArray([1]);
    lodash.castArray();
  });
});
