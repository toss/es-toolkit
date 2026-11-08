import { conforms as conformsToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('conforms', () => {
  bench('es-toolkit/conforms', () => {
    conformsToolkit({
      b: (n: number) => n > 1,
    });
  });

  bench('lodash/conforms', () => {
    lodash.conforms({
      b: (n: number) => n > 1,
    });
  });
});
