import { bench, describe } from 'vitest';
import { isWeakSet as isWeakSetToolkit } from 'es-toolkit';
import { isWeakSet as isWeakSetToolkitCompat } from 'es-toolkit/compat';
import { isWeakSet as isWeakSetLodash } from 'lodash';

describe('isWeakSet', () => {
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
    isWeakSetLodash(new WeakMap());
    isWeakSetLodash(new Map());
    isWeakSetLodash('');
    isWeakSetLodash(123);
  });
});
