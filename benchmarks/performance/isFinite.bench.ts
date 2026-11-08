import { isFinite as isFiniteToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isFinite', () => {
  bench('es-toolkit/isFinite', () => {
    isFiniteToolkit(1);
    isFiniteToolkit(1.12);
    isFiniteToolkit(Infinity);
    isFiniteToolkit(-Infinity);
    isFiniteToolkit([]);
    isFiniteToolkit({});
    isFiniteToolkit('1');
  });

  bench('lodash/isFinite', () => {
    lodash.isFinite(1);
    lodash.isFinite(1.12);
    lodash.isFinite(Infinity);
    lodash.isFinite(-Infinity);
    lodash.isFinite([]);
    lodash.isFinite({});
    lodash.isFinite('1');
  });
});
