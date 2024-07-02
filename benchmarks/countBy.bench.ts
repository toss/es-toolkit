import { bench, describe } from 'vitest';
import { countBy as countByToolkit } from 'es-toolkit';
import { countBy as countByLodash } from 'lodash';

describe('countBy', () => {
  bench('es-toolkit/countBy', () => {
    countByToolkit([1.2, 2.4, 3.6, 2.2, 3.4, 3.6], (item: number) => {
      return Math.floor(item).toString();
    });
  });

  bench('lodash/countBy', () => {
    countByLodash([1.2, 2.4, 3.6, 2.2, 3.4, 3.6], (item: number) => {
      return Math.floor(item).toString()
    });
  });
});
