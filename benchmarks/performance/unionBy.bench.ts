import { bench, describe } from 'vitest';
import { unionBy as unionByToolkit_ } from 'es-toolkit';
import { unionBy as unionByLodash_ } from 'lodash';

const unionByToolkit = unionByToolkit_;
const unionByLodash = unionByLodash_;

describe('unionBy', () => {
  bench('es-toolkit/unionBy', () => {
    unionByToolkit([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id);
  });

  bench('lodash/unionBy', () => {
    unionByLodash([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id);
  });
});
