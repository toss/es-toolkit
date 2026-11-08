import { repeat as repeatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('repeat', () => {
  bench('es-toolkit/repeat', () => {
    repeatToolkit('abc', 2);
  });

  bench('lodash/repeat', () => {
    lodash.repeat('abc', 2);
  });
});
