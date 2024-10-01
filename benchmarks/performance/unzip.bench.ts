import { bench, describe } from 'vitest';
import { unzip as unzipToolkit_ } from 'es-toolkit';
import { unzip as unzipLodash_ } from 'lodash';

const unzipToolkit = unzipToolkit_;
const unzipLodash = unzipLodash_;

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
