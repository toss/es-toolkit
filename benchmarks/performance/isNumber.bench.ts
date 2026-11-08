import { isNumber as isNumberToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isNumber', () => {
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
    lodash.isNumber(1);
    lodash.isNumber(1.5);
    lodash.isNumber(NaN);
    lodash.isNumber(Infinity);
    lodash.isNumber('1');
    lodash.isNumber(true);
    lodash.isNumber(null);
    lodash.isNumber(undefined);
    lodash.isNumber({});
    lodash.isNumber([]);
  });
});
