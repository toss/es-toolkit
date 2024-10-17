import { conformsTo as conformsToolkit } from 'es-toolkit/compat';
import { conformsTo as conformsToLodash } from 'lodash';
import { bench, describe } from '../bench';

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
