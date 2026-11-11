import { unionBy as unionByToolkit } from 'es-toolkit';
import { unionBy as unionByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('unionBy', () => {
  const array1 = [{ id: 1 }, { id: 2 }];
  const array2 = [{ id: 2 }, { id: 3 }];
  const getId = (x: { id: number }) => x.id;

  bench('es-toolkit/unionBy', () => {
    do_not_optimize(unionByToolkit(array1, array2, getId));
  });

  bench('es-toolkit/compat/unionBy', () => {
    do_not_optimize(unionByToolkitCompat(array1, array2, getId));
  });

  bench('lodash/unionBy', () => {
    do_not_optimize(lodash.unionBy(array1, array2, getId));
  });
});

group('unionBy/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));
  const getId = (x: { id: number }) => x.id;

  bench('es-toolkit/unionBy', () => {
    do_not_optimize(unionByToolkit(largeArray1, largeArray2, getId));
  });

  bench('es-toolkit/compat/unionBy', () => {
    do_not_optimize(unionByToolkitCompat(largeArray1, largeArray2, getId));
  });

  bench('lodash/unionBy', () => {
    do_not_optimize(lodash.unionBy(largeArray1, largeArray2, getId));
  });
});
