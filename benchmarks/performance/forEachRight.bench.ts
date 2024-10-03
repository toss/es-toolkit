import { bench, describe } from 'vitest';
import { forEachRight as forEachRightToolkit_ } from 'es-toolkit';
import { forEachRight as forEachRightLodash_ } from 'lodash';

const forEachRightToolkit = forEachRightToolkit_;
const forEachRightLodash = forEachRightLodash_;

describe('forEachRight', () => {
  bench('es-toolkit/forEachRight', () => {
    forEachRightToolkit([1, 2, 3, 4, 5, 6], x => x + 3);
  });

  bench('lodash/forEachRight', () => {
    forEachRightLodash([1, 2, 3, 4, 5, 6], x => x + 3);
  });
});
