import { bench, describe } from 'vitest';
import { toNumber as toNumberToolkitCompat } from 'es-toolkit/compat';
import { toNumber as toNumberLodash } from 'lodash';

describe('toNumber', () => {
  bench('es-toolkit/compat/toNumber', () => {
    toNumberToolkitCompat({ valueOf: () => 1 });
    toNumberToolkitCompat({ valueOf: () => 2 });
    toNumberToolkitCompat({ toString: () => '3' });
    toNumberToolkitCompat('0b101010');
    toNumberToolkitCompat('0o12345');
    toNumberToolkitCompat('0x1a2b3c');
    toNumberToolkitCompat('1.1');
  });

  bench('lodash/toNumber', () => {
    toNumberLodash({ valueof: () => 1 });
    toNumberLodash({ valueof: () => 2 });
    toNumberLodash({ toString: () => '3' });
    toNumberLodash('0b101010');
    toNumberLodash('0o12345');
    toNumberLodash('0x1a2b3c');
    toNumberLodash('1.1');
  });
});
