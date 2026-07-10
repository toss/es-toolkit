import { bench, describe } from 'vitest';
import { at as atToolkit } from 'es-toolkit';
import { at as atToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { at: atLodash } = lodash;

describe('at', () => {
  const data = ['a', 'b', 'c', 'd', 'e'];
  const indices = [0, 2, -2, 1.5, -1.5];

  bench('es-toolkit/at', () => {
    atToolkit(data, indices);
  });

  bench('es-toolkit/compat/at', () => {
    atToolkitCompat(data, indices);
  });

  bench('lodash/at', () => {
    atLodash(data, indices);
  });

  bench('Array.prototype.at', () => {
    indices.map(i => data.at(i));
  });
});

describe('at/largeArray', () => {
  const largeData = Array.from({ length: 10000 }, (_, i) => i);
  const largeIndices = Array.from({ length: 1000 }, (_, i) => i * 2);

  bench('es-toolkit/at', () => {
    atToolkit(largeData, largeIndices);
  });

  bench('es-toolkit/compat/at', () => {
    atToolkitCompat(largeData, largeIndices);
  });

  bench('lodash/at', () => {
    atLodash(largeData, largeIndices);
  });

  bench('Array.prototype.at', () => {
    largeIndices.map(i => largeData.at(i));
  });
});
