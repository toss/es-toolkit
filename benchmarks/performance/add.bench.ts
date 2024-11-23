import { bench, describe } from 'vitest';
import { add as addToolkitCompat_ } from 'es-toolkit/compat';
import { add as addLodash_ } from 'lodash';

const addToolkitCompat = addToolkitCompat_;
const addLodash = addLodash_;

describe('add function benchmark', () => {
  bench('es-toolkit/compat/add', () => {
    addToolkitCompat(2, 3);
    addToolkitCompat(-1, -5);
    addToolkitCompat(NaN, 3);
    addToolkitCompat(3, NaN);
    addToolkitCompat(NaN, NaN);
  });

  bench('lodash/add', () => {
    addLodash(2, 3);
    addLodash(-1, -5);
    addLodash(NaN, 3);
    addLodash(3, NaN);
    addLodash(NaN, NaN);
  });
});
