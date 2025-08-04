import { bench, describe } from 'vitest';
import { unionBy as unionByToolkit_ } from 'es-toolkit';
import { unionBy as unionByToolkitCompat_ } from 'es-toolkit/compat';
import { unionBy as unionByLodash_ } from 'lodash';
import { unionBy as unionByLodash_es } from 'lodash-es';

const unionByToolkit = unionByToolkit_;
const unionByToolkitCompat = unionByToolkitCompat_;
const unionByLodash = unionByLodash_;
const unionByLodashEs = unionByLodash_es;

describe('unionBy', () => {
  const array1 = [{ id: 1 }, { id: 2 }];
  const array2 = [{ id: 2 }, { id: 3 }];
  const getId = x => x.id;

  bench('es-toolkit/unionBy', () => {
    unionByToolkit(array1, array2, getId);
  });

  bench('es-toolkit/compat/unionBy', () => {
    unionByToolkitCompat(array1, array2, getId);
  });

  bench('lodash/unionBy', () => {
    unionByLodash(array1, array2, getId);
  });

  bench('lodash-es/unionBy', () => {
    unionByLodashEs(array1, array2, getId);
  });
});

describe('unionBy/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));
  const getId = x => x.id;

  bench('es-toolkit/unionBy', () => {
    unionByToolkit(largeArray1, largeArray2, getId);
  });

  bench('es-toolkit/compat/unionBy', () => {
    unionByToolkitCompat(largeArray1, largeArray2, getId);
  });

  bench('lodash/unionBy', () => {
    unionByLodash(largeArray1, largeArray2, getId);
  });

  bench('lodash-es/unionBy', () => {
    unionByLodashEs(largeArray1, largeArray2, getId);
  });
});
