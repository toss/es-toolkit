import { bench, describe } from 'vitest';
import { toFinite as toFiniteToolkitCompat } from 'es-toolkit/compat';
import { toFinite as toFiniteLodash } from 'lodash';

describe('toFinite', () => {
  bench('es-toolkit/compat/toFinite', () => {
    toFiniteToolkitCompat({ valueOf: () => 1 });
    toFiniteToolkitCompat({ valueOf: () => 2 });
    toFiniteToolkitCompat({ toString: () => '3' });
    toFiniteToolkitCompat('0b101010');
    toFiniteToolkitCompat('0o12345');
    toFiniteToolkitCompat('0x1a2b3c');
    toFiniteToolkitCompat('1.1');
  });

  bench('lodash/toFinite', () => {
    toFiniteLodash({ valueof: () => 1 });
    toFiniteLodash({ valueof: () => 2 });
    toFiniteLodash({ toString: () => '3' });
    toFiniteLodash('0b101010');
    toFiniteLodash('0o12345');
    toFiniteLodash('0x1a2b3c');
    toFiniteLodash('1.1');
  });
});
