import { isObject as isObjectToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isObject', () => {
  bench('es-toolkit/isObject', () => {
    isObjectToolkit([1, 2, 3]);
    isObjectToolkit(true);
    isObjectToolkit(new Date());
    isObjectToolkit(new Error());
    isObjectToolkit(1);
    isObjectToolkit(/x/);
    isObjectToolkit('a');
    isObjectToolkit(Array.prototype.slice);
  });

  bench('lodash/isObject', () => {
    lodash.isObject([1, 2, 3]);
    lodash.isObject(true);
    lodash.isObject(new Date());
    lodash.isObject(new Error());
    lodash.isObject(1);
    lodash.isObject(/x/);
    lodash.isObject('a');
    isObjectToolkit(Array.prototype.slice);
  });
});
