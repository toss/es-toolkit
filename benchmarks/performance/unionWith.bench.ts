import { unionWith as unionWithToolkit } from 'es-toolkit';
import { unionWith as unionWithLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('unionWith', () => {
  bench('es-toolkit/unionWith', () => {
    const array1 = [{ id: 1 }, { id: 2 }];
    const array2 = [{ id: 2 }, { id: 3 }];
    const areItemsEqual = (a, b) => a.id === b.id;
    unionWithToolkit(array1, array2, areItemsEqual);
  });

  bench('lodash/unionWith', () => {
    const array1 = [{ id: 1 }, { id: 2 }];
    const array2 = [{ id: 2 }, { id: 3 }];
    const areItemsEqual = (a, b) => a.id === b.id;
    unionWithLodash(array1, array2, areItemsEqual);
  });
});

describe('unionWith/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));

  bench('es-toolkit/unionWith', () => {
    unionWithToolkit(largeArray1, largeArray2, (a, b) => a.id === b.id);
  });

  bench('lodash/unionWith', () => {
    unionWithLodash(largeArray1, largeArray2, (a, b) => a.id === b.id);
  });
});
