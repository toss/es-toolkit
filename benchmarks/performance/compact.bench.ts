import { bench, describe } from 'vitest';
import { compact as compactToolkit_ } from 'es-toolkit';
import { compact as compactLodash_ } from 'lodash';

const compactToolkit = compactToolkit_;
const compactLodash = compactLodash_;

describe('compact', () => {
  bench('es-toolkit', () => {
    compactToolkit([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
  });

  bench('lodash', () => {
    compactLodash([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
  });
});

describe('compact/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => (i % 10 === 0 ? undefined : i));

  bench('es-toolkit', () => {
    compactToolkit(largeArray);
  });

  bench('lodash', () => {
    compactLodash(largeArray);
  });
});
