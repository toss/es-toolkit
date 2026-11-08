import { xorWith as xorWithToolkit } from 'es-toolkit';
import { xorWith as xorWithToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('xorWith', () => {
  bench('es-toolkit/xorWith', () => {
    do_not_optimize(xorWithToolkit([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x, y) => x.id === y.id));
  });

  bench('es-toolkit/compat/xorWith', () => {
    do_not_optimize(xorWithToolkitCompat([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x, y) => x.id === y.id));
  });

  bench('lodash/xorWith', () => {
    do_not_optimize(lodash.xorWith([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x, y) => x.id === y.id));
  });
});

group('xorWith/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));

  bench('es-toolkit/xorWith', () => {
    do_not_optimize(xorWithToolkit(largeArray1, largeArray2, (x, y) => x.id === y.id));
  });

  bench('es-toolkit/compat/xorWith', () => {
    do_not_optimize(xorWithToolkitCompat(largeArray1, largeArray2, (x, y) => x.id === y.id));
  });

  bench('lodash/xorWith', () => {
    do_not_optimize(lodash.xorWith(largeArray1, largeArray2, (x, y) => x.id === y.id));
  });
});
