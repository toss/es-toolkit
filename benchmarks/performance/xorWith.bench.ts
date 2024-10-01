import { bench, describe } from 'vitest';
import { xorWith as xorWithToolkit } from 'es-toolkit';
import { xorWith as xorWithLodash } from 'lodash';

describe('xorWith', () => {
  bench('es-toolkit/xorWith', () => {
    xorWithToolkit([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x, y) => x.id === y.id);
  });

  bench('lodash/xorWith', () => {
    xorWithLodash([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x, y) => x.id === y.id);
  });
});
