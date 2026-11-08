import { noop as noopToolkit } from 'es-toolkit';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('noop', () => {
  bench('es-toolkit/noop', () => {
    noopToolkit();
  });

  bench('lodash/noop', () => {
    lodash.noop();
  });
});
