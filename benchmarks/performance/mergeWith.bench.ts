import { bench, describe } from 'vitest';
import { mergeWith as mergeWithToolkit_ } from 'es-toolkit';
import { mergeWith as mergeWithCompatToolkit_ } from 'es-toolkit/compat';
import { mergeWith as mergeWithLodash_ } from 'lodash';

const mergeWithToolkit = mergeWithToolkit_;
const mergeWithCompatToolkit = mergeWithCompatToolkit_;
const mergeWithLodash = mergeWithLodash_;

const object = { a: 1, b: 2 };

const other = { b: 3, c: 4 };

const merge = (targetValue: any, sourceValue: any) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue;
  }
};

describe('mergeWith', () => {
  bench('lodash/mergeWith', () => {
    mergeWithLodash(object, other, merge);
  });

  bench('es-toolkit/mergeWith', () => {
    mergeWithToolkit(object, other, merge);
  });

  bench('es-toolkit/compat/mergeWith', () => {
    mergeWithCompatToolkit(object, other, merge);
  });
});
