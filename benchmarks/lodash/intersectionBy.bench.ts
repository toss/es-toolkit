import { bench, describe } from 'vitest';
import { intersectionBy as intersectionByToolkit } from 'es-toolkit';
import { intersectionBy as intersectionByLodash } from 'lodash';

describe('intersectionBy', () => {
  bench('es-toolkit', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const mapper = item => item.id;
    intersectionByToolkit(array1, array2, mapper);
  })

  bench('lodash', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const mapper = item => item.id;
    intersectionByLodash(array1, array2, mapper);
  })
});