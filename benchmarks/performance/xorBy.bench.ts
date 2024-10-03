import { bench, describe } from 'vitest';
import { xorBy as xorByToolkit_ } from 'es-toolkit';
import { xorBy as xorByLodash_ } from 'lodash';

const xorByToolkit = xorByToolkit_;
const xorByLodash = xorByLodash_;

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
