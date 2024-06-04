import { bench, describe } from 'vitest';
import { union as unionToolkit } from 'es-toolkit';
import { union as unionLodash } from 'lodash';

describe('union', () => {
  bench('es-toolkit', () => {
    const array1 = [1, 2, 3];
    const array2 = [3, 4, 5];
    const result = unionToolkit(array1, array2);
  });

  bench('lodash', () => {
    const array1 = [1, 2, 3];
    const array2 = [3, 4, 5];
    const result = unionLodash(array1, array2);
  });
});
