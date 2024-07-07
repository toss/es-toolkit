import { bench, describe } from 'vitest';
import { unzip as unzipToolkit } from 'es-toolkit';
import { unzip as unzipLodash } from 'lodash';

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
