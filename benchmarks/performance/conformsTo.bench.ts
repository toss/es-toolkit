import { bench, describe } from 'vitest';
import { conformsTo as conformsToToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { conformsTo: conformsToLodash } = lodash;

describe('conformsTo', () => {
  bench('es-toolkit/conformsTo', () => {
    conformsToToolkit(
      { a: 1, b: 2 },
      {
        a: (n: number) => n > 0,
        b: (n: number) => n > 1,
      }
    );
  });

  bench('lodash/conformsTo', () => {
    conformsToLodash(
      { a: 1, b: 2 },
      {
        a: (n: number) => n > 0,
        b: (n: number) => n > 1,
      }
    );
  });
});
