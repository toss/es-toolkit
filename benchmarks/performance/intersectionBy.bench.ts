import { bench, describe } from 'vitest';
import { intersectionBy as intersectionByToolkit_ } from 'es-toolkit';
import { intersectionBy as intersectionByLodash_ } from 'lodash';

const intersectionByToolkit = intersectionByToolkit_;
const intersectionByLodash = intersectionByLodash_;

describe('intersectionBy', () => {
  bench('es-toolkit/intersectionBy', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const mapper = item => item.id;
    intersectionByToolkit(array1, array2, mapper);
  });

  bench('lodash/intersectionBy', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const mapper = item => item.id;
    intersectionByLodash(array1, array2, mapper);
  });
});

describe('intersectionBy/largeArrays', () => {
  const array1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const array2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));
  const mapper = item => item.id;

  bench('es-toolkit/intersectionBy', () => {
    intersectionByToolkit(array1, array2, mapper);
  });

  bench('lodash/intersectionBy', () => {
    intersectionByLodash(array1, array2, mapper);
  });
});
