import { bench, describe } from 'vitest';
import { isFunction as isFunctionToolkit_ } from 'es-toolkit';
import { isFunction as isFunctionLodash_ } from 'lodash';

const isFunctionToolkit = isFunctionToolkit_;
const isFunctionLodash = isFunctionLodash_;

describe('isFunction', () => {
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
  bench('lodash/isFunction', () => {
    isFunctionLodash(true);
    isFunctionLodash(new Date());
    isFunctionLodash(new Error());
    isFunctionLodash({ a: 1 });
    isFunctionLodash(1);
    isFunctionLodash(/x/);
    isFunctionLodash(Array.from({ length: 10000 }));
    isFunctionLodash(async function () {});
    isFunctionLodash(function* () {});
    isFunctionLodash(Proxy);
    isFunctionLodash(Int8Array);
    isFunctionLodash(() => {});
    isFunctionLodash(Array.prototype.slice);
  });
});
