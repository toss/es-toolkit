import { isSubsetWith } from 'es-toolkit';
import { bench, do_not_optimize, group } from './harness.ts';

const areItemsEqual = (a: { id: number }, b: { id: number }) => a.id === b.id;

group('isSubsetWith', () => {
  const superset = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const subset = [{ id: 1 }, { id: 2 }];

  bench('es-toolkit/isSubsetWith', () => {
    do_not_optimize(isSubsetWith(superset, subset, areItemsEqual));
  });
});

group('isSubsetWith/largeArray', () => {
  const largeArray = Array.from({ length: 1000000 }, (_, index) => ({ id: index }));
  const subset = Array.from({ length: 2500 }, (_, index) => ({ id: index * 2 }));

  bench('es-toolkit/isSubsetWith', () => {
    do_not_optimize(isSubsetWith(largeArray, subset, areItemsEqual));
  });
});
