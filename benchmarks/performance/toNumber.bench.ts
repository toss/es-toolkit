import { toNumber as toNumberToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('toNumber', () => {
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
    lodash.toNumber({ valueof: () => 1 });
    lodash.toNumber({ valueof: () => 2 });
    lodash.toNumber({ toString: () => '3' });
    lodash.toNumber('0b101010');
    lodash.toNumber('0o12345');
    lodash.toNumber('0x1a2b3c');
    lodash.toNumber('1.1');
  });
});
