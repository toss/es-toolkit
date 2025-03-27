import { bench, describe } from 'vitest';
import { unionBy as unionByToolkit_ } from 'es-toolkit';
import { unionBy as unionByToolkitCompat_ } from 'es-toolkit/compat';
import { unionBy as unionByLodash_ } from 'lodash';

const unionByToolkit = unionByToolkit_;
const unionByLodash = unionByLodash_;

describe('unionBy', () => {
  bench('es-toolkit/unionBy', () => {
    unionByToolkit([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id);
  });

  bench('es-toolkit/compat/unionBy', () => {
    unionByToolkitCompat_([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id);
  });

  bench('lodash/unionBy', () => {
    unionByLodash([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id);
  });
});

describe('unionBy/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));

  bench('es-toolkit/unionBy', () => {
    unionByToolkit(largeArray1, largeArray2, x => x.id);
  });

  bench('es-toolkit/compat/unionBy', () => {
    unionByToolkitCompat_(largeArray1, largeArray2, x => x.id);
  });

  bench('lodash/unionBy', () => {
    unionByLodash(largeArray1, largeArray2, x => x.id);
  });
});
