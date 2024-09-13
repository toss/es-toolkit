import { bench, describe } from 'vitest';
import { mergeWith as mergeWithToolkit } from 'es-toolkit';
import { mergeWith as mergeWithCompatToolkit } from 'es-toolkit/compat';
import { mergeWith as mergeWithLodash } from 'lodash';

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
