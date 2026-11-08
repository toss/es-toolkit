import { conformsTo as conformsToToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('conformsTo', () => {
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
    lodash.conformsTo(
      { a: 1, b: 2 },
      {
        a: (n: number) => n > 0,
        b: (n: number) => n > 1,
      }
    );
  });
});
