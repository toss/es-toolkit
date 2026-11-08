import { range as rangeToolkit } from 'es-toolkit';
import { range as rangeCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('range', () => {
  bench('es-toolkit/range', () => {
    rangeToolkit(0, 100, 1);
  });

  bench('es-toolkit/compat/range', () => {
    rangeCompatToolkit(0, 100, 1);
  });

  bench('lodash/range', () => {
    lodash.range(0, 100, 1);
  });
});
