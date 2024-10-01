import { bench, describe } from 'vitest';
import { xorWith as xorWithToolkit_ } from 'es-toolkit';
import { xorWith as xorWithLodash_ } from 'lodash';

const xorWithLodash = xorWithLodash_;
const xorWithToolkit = xorWithToolkit_;

describe('xorWith', () => {
  bench('es-toolkit/xorWith', () => {
    xorWithToolkit([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x, y) => x.id === y.id);
  });

  bench('lodash/xorWith', () => {
    xorWithLodash([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x, y) => x.id === y.id);
  });
});
