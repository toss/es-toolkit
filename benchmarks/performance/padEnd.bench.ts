import { padEnd as padEndToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('padEnd', () => {
  bench('es-toolkit/padEnd', () => {
    const str = 'abc';
    do_not_optimize(padEndToolkit(str, 6, '_-'));
  });

  bench('lodash/padEnd', () => {
    const str = 'abc';
    do_not_optimize(lodash.padEnd(str, 6, '_-'));
  });
});
