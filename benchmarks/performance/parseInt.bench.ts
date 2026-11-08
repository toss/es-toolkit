import { parseInt as parseIntToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('parseInt', () => {
  bench('es-toolkit/parseInt', () => {
    parseIntToolkit('10');
  });

  bench('lodash/parseInt', () => {
    lodash.parseInt('10');
  });
});
