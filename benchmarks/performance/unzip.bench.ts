import { unzip as unzipToolkit } from 'es-toolkit';
import { unzip as unzipLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('unzip, small arrays', () => {
  bench('es-toolkit/unzip', () => {
    unzipToolkit([
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

  bench('lodash/unzip', () => {
    unzipLodash(largeArray);
  });
});
