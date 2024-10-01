import { bench, describe } from 'vitest';
import { conforms as conformsToolkit_ } from 'es-toolkit/compat';
import { conforms as conformsLodash_ } from 'lodash';

const conformsToolkit = conformsToolkit_;
const conformsLodash = conformsLodash_;

describe('conforms', () => {
  bench('es-toolkit/conforms', () => {
    conformsToolkit({
      b: (n: number) => n > 1,
    });
  });

  bench('lodash/conforms', () => {
    conformsLodash({
      b: (n: number) => n > 1,
    });
  });
});
