import { bench, describe } from 'vitest';
import { unionWith as unionWithToolkit } from 'es-toolkit';
import { unionWith as unionWithToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { unionWith: unionWithLodash } = lodash;

describe('unionWith', () => {
  const array1 = [{ id: 1 }, { id: 2 }];
  const array2 = [{ id: 2 }, { id: 3 }];
  const areItemsEqual = (a: { id: number }, b: { id: number }) => a.id === b.id;

  bench('es-toolkit/unionWith', () => {
    unionWithToolkit(array1, array2, areItemsEqual);
  });

  bench('es-toolkit/compat/unionWith', () => {
    unionWithToolkitCompat(array1, array2, areItemsEqual);
  });

  bench('lodash/unionWith', () => {
    unionWithLodash(array1, array2, areItemsEqual);
  });
});

describe('unionWith/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));
  const areItemsEqual = (a: { id: number }, b: { id: number }) => a.id === b.id;

  bench('es-toolkit/unionWith', () => {
    unionWithToolkit(largeArray1, largeArray2, areItemsEqual);
  });

  bench('es-toolkit/compat/unionWith', () => {
    unionWithToolkitCompat(largeArray1, largeArray2, areItemsEqual);
  });

  bench('lodash/unionWith', () => {
    unionWithLodash(largeArray1, largeArray2, areItemsEqual);
  });
});
