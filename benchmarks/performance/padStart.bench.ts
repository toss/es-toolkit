import { padStart as padStartToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('padStart', () => {
  bench('es-toolkit/padStart', () => {
    const str = 'abc';
    padStartToolkit(str, 6, '_-');
  });

  bench('lodash/padStart', () => {
    const str = 'abc';
    lodash.padStart(str, 6, '_-');
  });
});
