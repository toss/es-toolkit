import { bench, describe } from 'vitest';
import { reduceRight as reduceRightToolkitCompat_ } from 'es-toolkit/compat';
import { reduceRight as reduceRightLodash_ } from 'lodash';

const reduceRightToolkitCompat = reduceRightToolkitCompat_;
const reduceRightLodash = reduceRightLodash_;

const array = [1, 2, 3, 4, 5];

describe('reduceRight', () => {
  bench('es-toolkit/compat/reduceRight', () => {
    reduceRightToolkitCompat(array, (acc, x) => acc + x, 0);
  });

  bench('lodash/reduceRight', () => {
    reduceRightLodash(array, (acc, x) => acc + x, 0);
  });
});

describe('reduceRight - large array', () => {
  const largeArray = Array.from({ length: 1e6 }, (_, i) => i);

  bench('es-toolkit/compat/reduceRight', () => {
    reduceRightToolkitCompat(largeArray, (acc, x) => acc + x, 0);
  });

  bench('lodash/reduceRight', () => {
    reduceRightLodash(largeArray, (acc, x) => acc + x, 0);
  });
});
