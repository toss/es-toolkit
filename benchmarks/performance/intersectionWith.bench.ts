import { intersectionWith as intersectionWithToolkit } from 'es-toolkit';
import { intersectionWith as intersectionWithCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('intersectionWith', () => {
  bench('es-toolkit/intersectionWith', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const areItemsEqual = (a: { id: number }, b: { id: number }) => a.id === b.id;
    do_not_optimize(intersectionWithToolkit(array1, array2, areItemsEqual));
  });

  bench('es-toolkit/compat/intersectionWith', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const areItemsEqual = (a: { id: number }, b: { id: number }) => a.id === b.id;
    do_not_optimize(intersectionWithCompat(array1, array2, areItemsEqual));
  });

  bench('lodash/intersectionWith', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const areItemsEqual = (a: { id: number }, b: { id: number }) => a.id === b.id;
    do_not_optimize(lodash.intersectionWith(array1, array2, areItemsEqual));
  });
});

group('intersectionWith/largeArrays', () => {
  const array1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const array2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));
  const areItemsEqual = (a: { id: number }, b: { id: number }) => a.id === b.id;

  bench('es-toolkit/intersectionWith', () => {
    do_not_optimize(intersectionWithToolkit(array1, array2, areItemsEqual));
  });

  bench('es-toolkit/compat/intersectionWith', () => {
    do_not_optimize(intersectionWithCompat(array1, array2, areItemsEqual));
  });

  bench('lodash/intersectionWith', () => {
    do_not_optimize(lodash.intersectionWith(array1, array2, areItemsEqual));
  });
});
