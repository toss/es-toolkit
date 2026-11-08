import { isFunction as isFunctionToolkit } from 'es-toolkit';
import { isFunction as isFunctionToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isFunction', () => {
  bench('es-toolkit/isFunction', () => {
    do_not_optimize(isFunctionToolkit(true));
    do_not_optimize(isFunctionToolkit(new Date()));
    do_not_optimize(isFunctionToolkit(new Error()));
    do_not_optimize(isFunctionToolkit({ a: 1 }));
    do_not_optimize(isFunctionToolkit(1));
    do_not_optimize(isFunctionToolkit(/x/));
    do_not_optimize(isFunctionToolkit(Array.from({ length: 10000 })));
    do_not_optimize(isFunctionToolkit(async function () {}));
    do_not_optimize(isFunctionToolkit(function* () {}));
    do_not_optimize(isFunctionToolkit(Proxy));
    do_not_optimize(isFunctionToolkit(Int8Array));
    do_not_optimize(isFunctionToolkit(() => {}));
    do_not_optimize(isFunctionToolkit(Array.prototype.slice));
  });

  bench('es-toolkit/compat/isFunction', () => {
    do_not_optimize(isFunctionToolkitCompat(true));
    do_not_optimize(isFunctionToolkitCompat(new Date()));
    do_not_optimize(isFunctionToolkitCompat(new Error()));
    do_not_optimize(isFunctionToolkitCompat({ a: 1 }));
    do_not_optimize(isFunctionToolkitCompat(1));
    do_not_optimize(isFunctionToolkitCompat(/x/));
    do_not_optimize(isFunctionToolkitCompat(Array.from({ length: 10000 })));
    do_not_optimize(isFunctionToolkitCompat(async function () {}));
    do_not_optimize(isFunctionToolkitCompat(function* () {}));
    do_not_optimize(isFunctionToolkitCompat(Proxy));
    do_not_optimize(isFunctionToolkitCompat(Int8Array));
    do_not_optimize(isFunctionToolkitCompat(() => {}));
    do_not_optimize(isFunctionToolkitCompat(Array.prototype.slice));
  });

  bench('lodash/isFunction', () => {
    do_not_optimize(lodash.isFunction(true));
    do_not_optimize(lodash.isFunction(new Date()));
    do_not_optimize(lodash.isFunction(new Error()));
    do_not_optimize(lodash.isFunction({ a: 1 }));
    do_not_optimize(lodash.isFunction(1));
    do_not_optimize(lodash.isFunction(/x/));
    do_not_optimize(lodash.isFunction(Array.from({ length: 10000 })));
    do_not_optimize(lodash.isFunction(async function () {}));
    do_not_optimize(lodash.isFunction(function* () {}));
    do_not_optimize(lodash.isFunction(Proxy));
    do_not_optimize(lodash.isFunction(Int8Array));
    do_not_optimize(lodash.isFunction(() => {}));
    do_not_optimize(lodash.isFunction(Array.prototype.slice));
  });
});
