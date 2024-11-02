import { bench, describe } from 'vitest';
import { join as joinToolkit_ } from 'es-toolkit/compat';
import { join as joinLodash_ } from 'lodash';

const joinToolkit = joinToolkit_;
const joinLodash = joinLodash_;

describe('join', () => {
  bench('es-toolkit', () => {
    joinToolkit([1, 2, 3], ',');
  });

  bench('lodash', () => {
    joinLodash([1, 2, 3], ',');
  });
});

describe('join/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit', () => {
    joinToolkit(largeArray, ',');
  });

  bench('lodash', () => {
    joinLodash(largeArray, ',');
  });
});
