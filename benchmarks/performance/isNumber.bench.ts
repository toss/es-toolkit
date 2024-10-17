import { isNumber as isNumberToolkit } from 'es-toolkit/compat';
import { isNumber as isNumberLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('isNumber', () => {
  bench('es-toolkit/isNumber', () => {
    isNumberToolkit(1);
    isNumberToolkit(1.5);
    isNumberToolkit(NaN);
    isNumberToolkit(Infinity);
    isNumberToolkit('1');
    isNumberToolkit(true);
    isNumberToolkit(null);
    isNumberToolkit(undefined);
    isNumberToolkit({});
    isNumberToolkit([]);
  });

  bench('lodash/isNumber', () => {
    isNumberLodash(1);
    isNumberLodash(1.5);
    isNumberLodash(NaN);
    isNumberLodash(Infinity);
    isNumberLodash('1');
    isNumberLodash(true);
    isNumberLodash(null);
    isNumberLodash(undefined);
    isNumberLodash({});
    isNumberLodash([]);
  });
});
