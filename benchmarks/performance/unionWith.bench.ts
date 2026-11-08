import { unionWith as unionWithToolkit } from 'es-toolkit';
import { unionWith as unionWithToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('unionWith', () => {
  const array1 = [{ id: 1 }, { id: 2 }];
  const array2 = [{ id: 2 }, { id: 3 }];
  const areItemsEqual = (a: { id: number }, b: { id: number }) => a.id === b.id;

  bench('es-toolkit/unionWith', () => {
    do_not_optimize(unionWithToolkit(array1, array2, areItemsEqual));
  });

  bench('es-toolkit/compat/unionWith', () => {
    do_not_optimize(unionWithToolkitCompat(array1, array2, areItemsEqual));
  });

  bench('lodash/unionWith', () => {
    do_not_optimize(lodash.unionWith(array1, array2, areItemsEqual));
  });
});

group('unionWith/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));
  const areItemsEqual = (a: { id: number }, b: { id: number }) => a.id === b.id;

  bench('es-toolkit/unionWith', () => {
    do_not_optimize(unionWithToolkit(largeArray1, largeArray2, areItemsEqual));
  });

  bench('es-toolkit/compat/unionWith', () => {
    do_not_optimize(unionWithToolkitCompat(largeArray1, largeArray2, areItemsEqual));
  });

  bench('lodash/unionWith', () => {
    do_not_optimize(lodash.unionWith(largeArray1, largeArray2, areItemsEqual));
  });
});
