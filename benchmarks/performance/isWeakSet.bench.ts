import { bench, describe } from 'vitest';
import { isWeakSet as isWeakSetToolkit_ } from 'es-toolkit';
import { isWeakSet as isWeakSetToolkitCompat_ } from 'es-toolkit/compat';
import { isWeakSet as isWeakSetLodash_ } from 'lodash';

const isWeakSetToolkit = isWeakSetToolkit_;
const isWeakSetToolkitCompat = isWeakSetToolkitCompat_;
const isWeakSetLodash = isWeakSetLodash_;

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
