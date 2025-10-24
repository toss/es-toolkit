import { bench, describe } from 'vitest';
import { conformsTo as conformsToToolkit_ } from 'es-toolkit/compat';
import { conformsTo as conformsToLodash_ } from 'lodash';

const conformsToToolkit = conformsToToolkit_;
const conformsToLodash = conformsToLodash_;

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
