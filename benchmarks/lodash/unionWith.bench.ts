import { bench, describe } from 'vitest';
import { unionWith as unionWithToolkit } from 'es-toolkit';
import { unionWith as unionWithLodash } from 'lodash';

describe('unionWith', () => {
  bench('es-toolkit', () => {
    const array1 = [{ id: 1 }, { id: 2 }];
    const array2 = [{ id: 2 }, { id: 3 }];
    const areItemsEqual = (a, b) => a.id === b.id;
    unionWithToolkit(array1, array2, areItemsEqual);
  })

  bench('lodash', () => {
    const array1 = [{ id: 1 }, { id: 2 }];
    const array2 = [{ id: 2 }, { id: 3 }];
    const areItemsEqual = (a, b) => a.id === b.id;
    unionWithLodash(array1, array2, areItemsEqual);
  })
});