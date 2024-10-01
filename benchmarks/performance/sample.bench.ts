import { bench, describe } from 'vitest';
import { sample as sampleToolkit_ } from 'es-toolkit';
import { sample as sampleLodash_ } from 'lodash';

const sampleToolkit = sampleToolkit_;
const sampleLodash = sampleLodash_;

describe('sample', () => {
  bench('es-toolkit/sample', () => {
    const array = [1, 2, 3, 4, 5];
    sampleToolkit(array);
  });

  bench('lodash/sample', () => {
    const array = [1, 2, 3, 4, 5];
    sampleLodash(array);
  });
});
