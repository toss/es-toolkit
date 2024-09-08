import { bench, describe } from 'vitest';
import { conforms as conformsToolkit } from 'es-toolkit';
import { conforms as conformsCompat } from 'es-toolkit/compat';
import { conforms as conformsLodash } from 'lodash';

describe('conforms', () => {
  bench('es-toolkit/conforms', () => {
    conformsToolkit({
      b: (n: number) => n > 1,
    });
  });

  bench('es-toolkit/compat/conforms', () => {
    conformsCompat({
      b: (n: number) => n > 1,
    });
  });

  bench('lodash/conforms', () => {
    conformsLodash({
      b: (n: number) => n > 1,
    });
  });
});
