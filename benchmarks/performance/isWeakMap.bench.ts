import { isWeakMap as isWeakMapToolkit } from 'es-toolkit';
import { isWeakMap as isWeakMapToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isWeakMap', () => {
  bench('es-toolkit/isWeakMap', () => {
    isWeakMapToolkit(new WeakMap());
    isWeakMapToolkit(new Map());
    isWeakMapToolkit('');
    isWeakMapToolkit(123);
  });
  bench('es-toolkit/compat/isWeakMap', () => {
    isWeakMapToolkitCompat(new WeakMap());
    isWeakMapToolkitCompat(new Map());
    isWeakMapToolkitCompat('');
    isWeakMapToolkitCompat(123);
  });

  bench('lodash/isWeakMap', () => {
    lodash.isWeakMap(new WeakMap());
    lodash.isWeakMap(new Map());
    lodash.isWeakMap('');
    lodash.isWeakMap(123);
  });
});
