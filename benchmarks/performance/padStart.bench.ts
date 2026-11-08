import { padStart as padStartToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('padStart', () => {
  bench('es-toolkit/padStart', () => {
    const str = 'abc';
    do_not_optimize(padStartToolkit(str, 6, '_-'));
  });

  bench('lodash/padStart', () => {
    const str = 'abc';
    do_not_optimize(lodash.padStart(str, 6, '_-'));
  });
});
