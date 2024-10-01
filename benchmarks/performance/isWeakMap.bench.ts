import { bench, describe } from 'vitest';
import { isWeakMap as isWeakMapToolkit_ } from 'es-toolkit';
import { isWeakMap as isWeakMapToolkitCompat_ } from 'es-toolkit/compat';
import { isWeakMap as isWeakMapLodash_ } from 'lodash';

const isWeakMapToolkit = isWeakMapToolkit_;
const isWeakMapToolkitCompat = isWeakMapToolkitCompat_;
const isWeakMapLodash = isWeakMapLodash_;

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
