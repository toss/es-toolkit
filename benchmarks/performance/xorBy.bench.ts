import { bench, describe } from 'vitest';
import { xorBy as xorByToolkit_ } from 'es-toolkit';
import { xorBy as xorByToolkitCompat_ } from 'es-toolkit/compat';
import { xorBy as xorByLodash_ } from 'lodash';

const xorByToolkit = xorByToolkit_;
const xorByToolkitCompat = xorByToolkitCompat_;
const xorByLodash = xorByLodash_;

describe('xorBy', () => {
  bench('es-toolkit/xorBy', () => {
    const idMapper = obj => obj.id;
    xorByToolkit([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
  });

  bench('es-toolkit/compat/xorBy', () => {
    const idMapper = obj => obj.id;
    xorByToolkitCompat([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
  });

  bench('lodash/xorBy', () => {
    const idMapper = obj => obj.id;
    xorByLodash([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
  });
});

describe('xorBy/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));

  bench('es-toolkit/xorBy', () => {
    const idMapper = obj => obj.id;
    xorByToolkit(largeArray1, largeArray2, idMapper);
  });

  bench('es-toolkit/compat/xorBy', () => {
    const idMapper = obj => obj.id;
    xorByToolkitCompat(largeArray1, largeArray2, idMapper);
  });

  bench('lodash/xorBy', () => {
    const idMapper = obj => obj.id;
    xorByLodash(largeArray1, largeArray2, idMapper);
  });
});
