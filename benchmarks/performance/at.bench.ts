import { bench, describe } from 'vitest';
import { at as atToolkit_ } from 'es-toolkit';
import { at as atLodash_ } from 'lodash';

const atToolkit = atToolkit_;
const atLodash = atLodash_;

describe('at', () => {
  const data = ['a', 'b', 'c', 'd', 'e'];
  const indices = [0, 2, 4];

  bench('es-toolkit/at', () => {
    atToolkit(data, indices);
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

  bench('lodash/at', () => {
    atLodash(largeData, largeIndices);
  });

  bench('Array.prototype.at', () => {
    largeIndices.map(i => largeData.at(i));
  });
});
