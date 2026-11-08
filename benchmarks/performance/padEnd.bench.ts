import { padEnd as padEndToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('padEnd', () => {
  bench('es-toolkit/padEnd', () => {
    const str = 'abc';
    padEndToolkit(str, 6, '_-');
  });

  bench('lodash/padEnd', () => {
    const str = 'abc';
    lodash.padEnd(str, 6, '_-');
  });
});
