import { bench, describe } from 'vitest';
import { intersectionWith as intersectionWithToolkit } from 'es-toolkit';
import { intersectionWith as intersectionWithLodash } from 'lodash';

describe('intersectionWith', () => {
  bench('es-toolkit', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const areItemsEqual = (a, b) => a.id === b.id;
    intersectionWithToolkit(array1, array2, areItemsEqual);
  })

  bench('lodash', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const areItemsEqual = (a, b) => a.id === b.id;
    intersectionWithLodash(array1, array2, areItemsEqual);
  })
});