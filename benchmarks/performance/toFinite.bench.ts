import { toFinite as toFiniteToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('toFinite', () => {
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
    lodash.toFinite({ valueof: () => 1 });
    lodash.toFinite({ valueof: () => 2 });
    lodash.toFinite({ toString: () => '3' });
    lodash.toFinite('0b101010');
    lodash.toFinite('0o12345');
    lodash.toFinite('0x1a2b3c');
    lodash.toFinite('1.1');
  });
});
