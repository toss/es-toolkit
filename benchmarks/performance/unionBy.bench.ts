import { bench, describe } from 'vitest';
import { unionBy as unionByToolkit } from 'es-toolkit';
import { unionBy as unionByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { unionBy: unionByLodash } = lodash;

describe('unionBy', () => {
  const array1 = [{ id: 1 }, { id: 2 }];
  const array2 = [{ id: 2 }, { id: 3 }];
  const getId = (x: { id: number }) => x.id;

  bench('es-toolkit/unionBy', () => {
    unionByToolkit(array1, array2, getId);
  });

  bench('es-toolkit/compat/unionBy', () => {
    unionByToolkitCompat(array1, array2, getId);
  });

  bench('lodash/unionBy', () => {
    unionByLodash(array1, array2, getId);
  });
});

describe('unionBy/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));
  const getId = (x: { id: number }) => x.id;

  bench('es-toolkit/unionBy', () => {
    unionByToolkit(largeArray1, largeArray2, getId);
  });

  bench('es-toolkit/compat/unionBy', () => {
    unionByToolkitCompat(largeArray1, largeArray2, getId);
  });

  bench('lodash/unionBy', () => {
    unionByLodash(largeArray1, largeArray2, getId);
  });
});
