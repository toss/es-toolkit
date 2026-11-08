import { defer as deferToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('defer', () => {
  bench('es-toolkit/defer', () => {
    const id = deferToolkit(() => {});
    clearTimeout(id);
  });

  bench('lodash/defer', () => {
    const id = lodash.defer(() => {});
    clearTimeout(id);
  });
});
