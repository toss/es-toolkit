import { bench, describe } from 'vitest';
import { intersectionWith as intersectionWithToolkit_ } from 'es-toolkit';
import { intersectionWith as intersectionWithLodash_ } from 'lodash';

const intersectionWithToolkit = intersectionWithToolkit_;
const intersectionWithLodash = intersectionWithLodash_;

describe('intersectionWith', () => {
  bench('es-toolkit/intersectionWith', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const areItemsEqual = (a, b) => a.id === b.id;
    intersectionWithToolkit(array1, array2, areItemsEqual);
  });

  bench('lodash/intersectionWith', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const areItemsEqual = (a, b) => a.id === b.id;
    intersectionWithLodash(array1, array2, areItemsEqual);
  });
});
