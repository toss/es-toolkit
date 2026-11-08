import { isFunction as isFunctionToolkit } from 'es-toolkit';
import { isFunction as isFunctionToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isFunction', () => {
  bench('es-toolkit/isFunction', () => {
    isFunctionToolkit(true);
    isFunctionToolkit(new Date());
    isFunctionToolkit(new Error());
    isFunctionToolkit({ a: 1 });
    isFunctionToolkit(1);
    isFunctionToolkit(/x/);
    isFunctionToolkit(Array.from({ length: 10000 }));
    isFunctionToolkit(async function () {});
    isFunctionToolkit(function* () {});
    isFunctionToolkit(Proxy);
    isFunctionToolkit(Int8Array);
    isFunctionToolkit(() => {});
    isFunctionToolkit(Array.prototype.slice);
  });

  bench('es-toolkit/compat/isFunction', () => {
    isFunctionToolkitCompat(true);
    isFunctionToolkitCompat(new Date());
    isFunctionToolkitCompat(new Error());
    isFunctionToolkitCompat({ a: 1 });
    isFunctionToolkitCompat(1);
    isFunctionToolkitCompat(/x/);
    isFunctionToolkitCompat(Array.from({ length: 10000 }));
    isFunctionToolkitCompat(async function () {});
    isFunctionToolkitCompat(function* () {});
    isFunctionToolkitCompat(Proxy);
    isFunctionToolkitCompat(Int8Array);
    isFunctionToolkitCompat(() => {});
    isFunctionToolkitCompat(Array.prototype.slice);
  });

  bench('lodash/isFunction', () => {
    lodash.isFunction(true);
    lodash.isFunction(new Date());
    lodash.isFunction(new Error());
    lodash.isFunction({ a: 1 });
    lodash.isFunction(1);
    lodash.isFunction(/x/);
    lodash.isFunction(Array.from({ length: 10000 }));
    lodash.isFunction(async function () {});
    lodash.isFunction(function* () {});
    lodash.isFunction(Proxy);
    lodash.isFunction(Int8Array);
    lodash.isFunction(() => {});
    lodash.isFunction(Array.prototype.slice);
  });
});
