import { bench, describe } from 'vitest';
import { pullAt as pullAtToolkit_ } from 'es-toolkit';
import { pullAt as pullAtLodash_ } from 'lodash';

const pullAtToolkit = pullAtToolkit_;
const pullAtLodash = pullAtLodash_;

describe('pullAt', () => {
  const array = [0, 1, 2, 3, 4, 5];
  const indexes = [3, 5, 1, 2];

  bench('es-toolkit/pullAt', () => {
    pullAtToolkit(array, indexes);
  });

  bench('lodash/pullAt', () => {
    pullAtLodash(array, indexes);
  });
});
