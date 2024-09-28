import { bench, describe } from 'vitest';
import { isObject as isObjectToolkit } from 'es-toolkit/compat';
import { isObject as isObjectLodash } from 'lodash';

describe('isObject', () => {
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
    isObjectLodash([1, 2, 3]);
    isObjectLodash(true);
    isObjectLodash(new Date());
    isObjectLodash(new Error());
    isObjectLodash(1);
    isObjectLodash(/x/);
    isObjectLodash('a');
    isObjectToolkit(Array.prototype.slice);
  });
});
