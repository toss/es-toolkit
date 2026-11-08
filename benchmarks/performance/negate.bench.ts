import { negate as negateToolkit } from 'es-toolkit';
import { negate as negateCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('compact', () => {
  bench('es-toolkit', () => {
    negateToolkit(() => true)();
  });

  bench('es-toolkit/compat', () => {
    negateCompatToolkit(() => true)();
  });

  bench('lodash', () => {
    lodash.negate(() => true)();
  });
});
