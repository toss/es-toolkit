import { isSet as isSetToolkit } from 'es-toolkit';
import { isSet as isSetToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isSet', () => {
  bench('es-toolkit/isSet', () => {
    isSetToolkit(new Set());
    isSetToolkit(new WeakSet());
    isSetToolkit([]);
    isSetToolkit({});
    isSetToolkit(null);
  });

  bench('es-toolkit/isSetCompat', () => {
    isSetToolkitCompat(new Set());
    isSetToolkitCompat(new WeakSet());
    isSetToolkitCompat([]);
    isSetToolkitCompat({});
    isSetToolkitCompat(null);
  });

  bench('lodash/isSet', () => {
    lodash.isSet(new Set());
    lodash.isSet(new WeakSet());
    lodash.isSet([]);
    lodash.isSet({});
    lodash.isSet(null);
  });
});
