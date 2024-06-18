import { bench, describe } from 'vitest';
import { unionBy as unionByToolkit } from 'es-toolkit';
import { unionBy as unionByLodash } from 'lodash';

describe('unionBy', () => {
  bench('es-toolkit/unionBy', () => {
    unionByToolkit([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id);
  });

  bench('lodash/unionBy', () => {
    unionByLodash([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id);
  });
});
