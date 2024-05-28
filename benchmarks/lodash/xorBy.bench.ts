import { bench, describe } from 'vitest';
import { xorBy as xorByToolkit } from 'es-toolkit';
import { xorBy as xorByLodash } from 'lodash';

describe('xorBy', () => {
  bench('es-toolkit', () => {
    const idMapper = obj => obj.id;
    xorByToolkit([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
  })

  bench('lodash', () => {
    const idMapper = obj => obj.id;
    xorByLodash([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
  })
});
