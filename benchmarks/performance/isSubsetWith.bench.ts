import { bench, describe } from 'vitest';
import { isSubsetWith } from 'es-toolkit';

const areItemsEqual = (a: { id: number }, b: { id: number }) => a.id === b.id;

describe('isSubsetWith', () => {
  const superset = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const subset = [{ id: 1 }, { id: 2 }];

  bench('es-toolkit/isSubsetWith', () => {
    isSubsetWith(superset, subset, areItemsEqual);
  });
});

describe('isSubsetWith/largeArray', () => {
  const largeArray = Array.from({ length: 1000000 }, (_, index) => ({ id: index }));
  const subset = Array.from({ length: 2500 }, (_, index) => ({ id: index * 2 }));

  bench('es-toolkit/isSubsetWith', () => {
    isSubsetWith(largeArray, subset, areItemsEqual);
  });
});
