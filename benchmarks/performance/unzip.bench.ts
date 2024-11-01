import { bench, describe } from 'vitest';
import { unzip as unzipToolkit_ } from 'es-toolkit';
import { unzip as unzipToolkitCompat_ } from 'es-toolkit/compat';
import { unzip as unzipLodash_ } from 'lodash';

const unzipToolkit = unzipToolkit_;
const unzipToolkitCompat = unzipToolkitCompat_;
const unzipLodash = unzipLodash_;

describe('unzip, small arrays', () => {
  bench('es-toolkit/unzip', () => {
    unzipToolkit([
      ['a', 1, true],
      ['b', 2, false],
    ]);
  });

  bench('es-toolkit/compat/unzip', () => {
    unzipToolkitCompat([
      ['a', 1, true],
      ['b', 2, false],
    ]);
  });

  bench('lodash/unzip', () => {
    unzipLodash([
      ['a', 1, true],
      ['b', 2, false],
    ]);
  });
});

describe('unzip, large arrays', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ['a', i, true]);

  bench('es-toolkit/unzip', () => {
    unzipToolkit(largeArray);
  });

  bench('es-toolkit/compat/unzip', () => {
    unzipToolkitCompat(largeArray);
  });

  bench('lodash/unzip', () => {
    unzipLodash(largeArray);
  });
});
