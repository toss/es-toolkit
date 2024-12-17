import { bench, describe } from 'vitest';
import { slice as sliceToolkitCompat_ } from 'es-toolkit/compat';
import { slice as sliceLodash_ } from 'lodash';

const sliceToolkitCompat = sliceToolkitCompat_;
const sliceLodash = sliceLodash_;

describe('slice', () => {
  const array = Array(1000);
  bench('es-toolkit/compat/slice', () => {
    sliceToolkitCompat(array);
    sliceToolkitCompat(array, 1);
    sliceToolkitCompat(array, 1, 2);
    sliceToolkitCompat(array, 1, 1000);
  });

  bench('lodash/slice', () => {
    sliceLodash(array);
    sliceLodash(array, 1);
    sliceLodash(array, 1, 2);
    sliceLodash(array, 1, 1000);
  });
});
