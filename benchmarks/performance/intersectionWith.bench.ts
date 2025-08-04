import { bench, describe } from 'vitest';
import { intersectionWith as intersectionWithToolkit_ } from 'es-toolkit';
import { intersectionWith as intersectionWithCompat_ } from 'es-toolkit/compat';
import { intersectionWith as intersectionWithLodash_ } from 'lodash';
import { intersectionWith as intersectionWithLodash_es } from 'lodash-es';

const intersectionWithToolkit = intersectionWithToolkit_;
const intersectionWithCompat = intersectionWithCompat_;
const intersectionWithLodash = intersectionWithLodash_;
const intersectionWithLodashEs = intersectionWithLodash_es;

describe('intersectionWith', () => {
  bench('es-toolkit/intersectionWith', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const areItemsEqual = (a, b) => a.id === b.id;
    intersectionWithToolkit(array1, array2, areItemsEqual);
  });

  bench('es-toolkit/compat/intersectionWith', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const areItemsEqual = (a, b) => a.id === b.id;
    intersectionWithCompat(array1, array2, areItemsEqual);
  });

  bench('lodash/intersectionWith', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const areItemsEqual = (a, b) => a.id === b.id;
    intersectionWithLodash(array1, array2, areItemsEqual);
  });

  bench('lodash-es/intersectionWith', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const areItemsEqual = (a, b) => a.id === b.id;
    intersectionWithLodashEs(array1, array2, areItemsEqual);
  });
});

describe('intersectionWith/largeArrays', () => {
  const array1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const array2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));
  const areItemsEqual = (a, b) => a.id === b.id;

  bench('es-toolkit/intersectionWith', () => {
    intersectionWithToolkit(array1, array2, areItemsEqual);
  });

  bench('es-toolkit/compat/intersectionWith', () => {
    intersectionWithCompat(array1, array2, areItemsEqual);
  });

  bench('lodash/intersectionWith', () => {
    intersectionWithLodash(array1, array2, areItemsEqual);
  });

  bench('lodash-es/intersectionWith', () => {
    intersectionWithLodashEs(array1, array2, areItemsEqual);
  });
});
