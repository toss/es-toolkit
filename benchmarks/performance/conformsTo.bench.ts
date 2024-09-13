import { bench, describe } from 'vitest';
import { conformsTo as conformsToToolkit } from 'es-toolkit';
import { conformsTo as conformsCompat } from 'es-toolkit/compat';
import { conformsTo as conformsToLodash } from 'lodash';

describe('conformsTo', () => {
  bench('es-toolkit/conformsTo', () => {
    conformsToToolkit(
      { a: 1, b: 2 },
      {
        b: (n: number) => n > 1,
      }
    );
  });

  bench('es-toolkit/compat/conformsTo', () => {
    conformsCompat(
      { a: 1, b: 2 },
      {
        b: (n: number) => n > 1,
      }
    );
  });

  bench('lodash/conformsTo', () => {
    conformsToLodash(
      { a: 1, b: 2 },
      {
        b: (n: number) => n > 1,
      }
    );
  });
});
