import { isObject as isObjectToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isObject', () => {
  bench('es-toolkit/isObject', () => {
    do_not_optimize(isObjectToolkit([1, 2, 3]));
    do_not_optimize(isObjectToolkit(true));
    do_not_optimize(isObjectToolkit(new Date()));
    do_not_optimize(isObjectToolkit(new Error()));
    do_not_optimize(isObjectToolkit(1));
    do_not_optimize(isObjectToolkit(/x/));
    do_not_optimize(isObjectToolkit('a'));
    do_not_optimize(isObjectToolkit(Array.prototype.slice));
  });

  bench('lodash/isObject', () => {
    do_not_optimize(lodash.isObject([1, 2, 3]));
    do_not_optimize(lodash.isObject(true));
    do_not_optimize(lodash.isObject(new Date()));
    do_not_optimize(lodash.isObject(new Error()));
    do_not_optimize(lodash.isObject(1));
    do_not_optimize(lodash.isObject(/x/));
    do_not_optimize(lodash.isObject('a'));
    do_not_optimize(isObjectToolkit(Array.prototype.slice));
  });
});
