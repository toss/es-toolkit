import { bench, describe } from 'vitest';
import { conformsTo as conformsToolkit_ } from 'es-toolkit/compat';
import { conformsTo as conformsToLodash_ } from 'lodash';

const conformsToolkit = conformsToolkit_;
const conformsToLodash = conformsToLodash_;

describe('conformsTo', () => {
  bench('es-toolkit/conformsTo', () => {
    conformsToolkit(
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
