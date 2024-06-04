import { bench, describe } from 'vitest';
import { unionBy as unionByToolkit } from 'es-toolkit';
import { unionBy as unionByLodash } from 'lodash';

describe('unionBy', () => {
  bench('es-toolkit', () => {
    unionByToolkit([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id);
  });

  bench('lodash', () => {
    unionByLodash([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id);
  });
});
