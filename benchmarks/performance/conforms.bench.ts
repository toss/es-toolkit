import { conforms as conformsToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('conforms', () => {
  bench('es-toolkit/conforms', () => {
    do_not_optimize(
      conformsToolkit({
        b: (n: number) => n > 1,
      })
    );
  });

  bench('lodash/conforms', () => {
    do_not_optimize(
      lodash.conforms({
        b: (n: number) => n > 1,
      })
    );
  });
});
