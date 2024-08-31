import { bench, describe } from 'vitest';
import { isWeakMap as isWeakMapToolkit } from 'es-toolkit';
import { isWeakMap as isWeakMapToolkitCompat } from 'es-toolkit/compat';
import { isWeakMap as isWeakMapLodash } from 'lodash';

describe('isWeakMap', () => {
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
    isWeakMapLodash(new WeakMap());
    isWeakMapLodash(new Map());
    isWeakMapLodash('');
    isWeakMapLodash(123);
  });
});
