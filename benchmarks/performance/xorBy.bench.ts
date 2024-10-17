import { xorBy as xorByToolkit } from 'es-toolkit';
import { xorBy as xorByLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('xorBy', () => {
  bench('es-toolkit/xorBy', () => {
    const idMapper = obj => obj.id;
    xorByToolkit([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
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

  bench('lodash/xorBy', () => {
    const idMapper = obj => obj.id;
    xorByLodash(largeArray1, largeArray2, idMapper);
  });
});
