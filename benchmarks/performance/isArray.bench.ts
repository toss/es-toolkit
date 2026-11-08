import { isArray as isArrayToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isArray', () => {
  bench('es-toolkit/isArray', () => {
    isArrayToolkit([1, 2, 3]);
    isArrayToolkit('abc');
    isArrayToolkit(() => {});
  });

  bench('lodash/isArray', () => {
    lodash.isArray([1, 2, 3]);
    lodash.isArray('abc');
    lodash.isArray(() => {});
  });
});
