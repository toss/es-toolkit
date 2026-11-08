import { xorWith as xorWithToolkit } from 'es-toolkit';
import { xorWith as xorWithToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('xorWith', () => {
  bench('es-toolkit/xorWith', () => {
    xorWithToolkit([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x, y) => x.id === y.id);
  });

  bench('es-toolkit/compat/xorWith', () => {
    xorWithToolkitCompat([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x, y) => x.id === y.id);
  });

  bench('lodash/xorWith', () => {
    lodash.xorWith([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x, y) => x.id === y.id);
  });
});

group('xorWith/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));

  bench('es-toolkit/xorWith', () => {
    xorWithToolkit(largeArray1, largeArray2, (x, y) => x.id === y.id);
  });

  bench('es-toolkit/compat/xorWith', () => {
    xorWithToolkitCompat(largeArray1, largeArray2, (x, y) => x.id === y.id);
  });

  bench('lodash/xorWith', () => {
    lodash.xorWith(largeArray1, largeArray2, (x, y) => x.id === y.id);
  });
});
