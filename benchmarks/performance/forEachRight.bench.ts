import { bench, describe } from 'vitest';
import { forEachRight as forEachRightToolkit_ } from 'es-toolkit';
import { forEachRight as forEachRightToolkitCompat_ } from 'es-toolkit/compat';
import { forEachRight as forEachRightLodash_ } from 'lodash';

const forEachRightToolkit = forEachRightToolkit_;
const forEachRightToolkitCompat = forEachRightToolkitCompat_;
const forEachRightLodash = forEachRightLodash_;

describe('forEachRight', () => {
  bench('es-toolkit/forEachRight', () => {
    forEachRightToolkit([1, 2, 3, 4, 5, 6], x => x + 3);
  });

  bench('es-toolkit/compat/forEachRight', () => {
    forEachRightToolkitCompat([1, 2, 3, 4, 5, 6], x => x + 3);
  });

  bench('lodash/forEachRight', () => {
    forEachRightLodash([1, 2, 3, 4, 5, 6], x => x + 3);
  });
});

describe('forEachRight/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/forEachRight', () => {
    forEachRightToolkit(largeArray, x => x + 3);
  });

  bench('es-toolkit/compat/forEachRight', () => {
    forEachRightToolkitCompat(largeArray, x => x + 3);
  });

  bench('lodash/forEachRight', () => {
    forEachRightLodash(largeArray, x => x + 3);
  });
});
