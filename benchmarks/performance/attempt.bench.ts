import { attempt as attemptToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('attempt', () => {
  bench('es-toolkit/attempt', () => {
    attemptToolkit(() => undefined);
  });

  bench('lodash/attempt', () => {
    lodash.attempt(() => undefined);
  });
});
