import { unionBy as unionByToolkit } from 'es-toolkit';
import { unionBy as unionByLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('unionBy', () => {
  bench('es-toolkit/unionBy', () => {
    unionByToolkit([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id);
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

  bench('lodash/unionBy', () => {
    unionByLodash(largeArray1, largeArray2, x => x.id);
  });
});
