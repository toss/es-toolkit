import { bench, describe } from 'vitest';
import { xorWith as xorWithToolkit_ } from 'es-toolkit';
import { xorWith as xorWithToolkitCompat_ } from 'es-toolkit/compat';
import { xorWith as xorWithLodash_ } from 'lodash';

const xorWithLodash = xorWithLodash_;
const xorWithToolkitCompat = xorWithToolkitCompat_;
const xorWithToolkit = xorWithToolkit_;

describe('xorWith', () => {
  bench('es-toolkit/xorWith', () => {
    xorWithToolkit([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x, y) => x.id === y.id);
  });

  bench('es-toolkit/compat/xorWith', () => {
    xorWithToolkitCompat([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x, y) => x.id === y.id);
  });

  bench('lodash/xorWith', () => {
    xorWithLodash([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x, y) => x.id === y.id);
  });
});

describe('xorWith/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));

  bench('es-toolkit/xorWith', () => {
    xorWithToolkit(largeArray1, largeArray2, (x, y) => x.id === y.id);
  });

  bench('es-toolkit/compat/xorWith', () => {
    xorWithToolkitCompat(largeArray1, largeArray2, (x, y) => x.id === y.id);
  });

  bench('lodash/xorWith', () => {
    xorWithLodash(largeArray1, largeArray2, (x, y) => x.id === y.id);
  });
});
