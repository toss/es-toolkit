import { bench, describe } from 'vitest';
import { countBy as countByToolkit_ } from 'es-toolkit';
import { countBy as countByLodash_ } from 'lodash';

const countByToolkit = countByToolkit_;
const countByLodash = countByLodash_;

describe('countBy', () => {
  bench('es-toolkit/countBy', () => {
    countByToolkit([1.2, 2.4, 3.6, 2.2, 3.4, 3.6], (item: number) => {
      return Math.floor(item).toString();
    });
  });

  bench('lodash/countBy', () => {
    countByLodash([1.2, 2.4, 3.6, 2.2, 3.4, 3.6], (item: number) => {
      return Math.floor(item).toString();
    });
  });
});

describe('countBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i + 0.5);

  bench('es-toolkit/countBy', () => {
    countByToolkit(largeArray, (item: number) => {
      return Math.floor(item).toString();
    });
  });

  bench('lodash/countBy', () => {
    countByLodash(largeArray, (item: number) => {
      return Math.floor(item).toString();
    });
  });
});
