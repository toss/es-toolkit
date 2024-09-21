import { bench, describe } from 'vitest';
import { toInteger as toIntegerToolkitCompat } from 'es-toolkit/compat';
import { toInteger as toIntegerLodash } from 'lodash';

describe('toInteger', () => {
  bench('es-toolkit/compat/toInteger', () => {
    toIntegerToolkitCompat({ valueOf: () => 1 });
    toIntegerToolkitCompat({ valueOf: () => 2 });
    toIntegerToolkitCompat({ toString: () => '3' });
    toIntegerToolkitCompat('0b101010');
    toIntegerToolkitCompat('0o12345');
    toIntegerToolkitCompat('0x1a2b3c');
    toIntegerToolkitCompat('1.1');
  });

  bench('lodash/toInteger', () => {
    toIntegerLodash({ valueof: () => 1 });
    toIntegerLodash({ valueof: () => 2 });
    toIntegerLodash({ toString: () => '3' });
    toIntegerLodash('0b101010');
    toIntegerLodash('0o12345');
    toIntegerLodash('0x1a2b3c');
    toIntegerLodash('1.1');
  });
});
