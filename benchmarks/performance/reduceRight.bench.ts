import { bench, describe } from 'vitest';
import { reduceRight as reduceRightToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { reduceRight: reduceRightLodash } = lodash;

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
