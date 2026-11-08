import { flip as flipToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('flip', () => {
  function fn(a: any, b: any, c: any, d: any) {
    return [a, b, c, d];
  }

  bench('es-toolkit/flip', () => {
    flipToolkit(fn);
  });

  bench('lodash/flip', () => {
    lodash.flip(fn);
  });
});
