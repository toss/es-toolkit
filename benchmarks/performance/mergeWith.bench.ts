import { mergeWith as mergeWithToolkit } from 'es-toolkit';
import { mergeWith as mergeWithCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const object = { a: 1, b: 2 };

const other = { b: 3, c: 4 };

const merge = (targetValue: unknown, sourceValue: unknown) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue;
  }
};

group('mergeWith', () => {
  bench('lodash/mergeWith', () => {
    do_not_optimize(lodash.mergeWith(object, other, merge));
  });

  bench('es-toolkit/mergeWith', () => {
    do_not_optimize(mergeWithToolkit(object, other, merge));
  });

  bench('es-toolkit/compat/mergeWith', () => {
    do_not_optimize(mergeWithCompatToolkit(object, other, merge));
  });
});
