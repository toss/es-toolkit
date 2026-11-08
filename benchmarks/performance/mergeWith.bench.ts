import { mergeWith as mergeWithToolkit } from 'es-toolkit';
import { mergeWith as mergeWithCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const object = { a: 1, b: 2 };

const other = { b: 3, c: 4 };

const merge = (targetValue: unknown, sourceValue: unknown) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue;
  }
};

group('mergeWith', () => {
  bench('lodash/mergeWith', () => {
    lodash.mergeWith(object, other, merge);
  });

  bench('es-toolkit/mergeWith', () => {
    mergeWithToolkit(object, other, merge);
  });

  bench('es-toolkit/compat/mergeWith', () => {
    mergeWithCompatToolkit(object, other, merge);
  });
});
