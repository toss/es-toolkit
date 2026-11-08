import { isWeakSet as isWeakSetToolkit } from 'es-toolkit';
import { isWeakSet as isWeakSetToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isWeakSet', () => {
  bench('es-toolkit/isWeakSet', () => {
    isWeakSetToolkit(new WeakMap());
    isWeakSetToolkit(new Map());
    isWeakSetToolkit('');
    isWeakSetToolkit(123);
  });
  bench('es-toolkit/compat/isWeakSet', () => {
    isWeakSetToolkitCompat(new WeakMap());
    isWeakSetToolkitCompat(new Map());
    isWeakSetToolkitCompat('');
    isWeakSetToolkitCompat(123);
  });

  bench('lodash/isWeakSet', () => {
    lodash.isWeakSet(new WeakMap());
    lodash.isWeakSet(new Map());
    lodash.isWeakSet('');
    lodash.isWeakSet(123);
  });
});
