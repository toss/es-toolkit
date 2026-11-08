import { toInteger as toIntegerToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('toInteger', () => {
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
    lodash.toInteger({ valueof: () => 1 });
    lodash.toInteger({ valueof: () => 2 });
    lodash.toInteger({ toString: () => '3' });
    lodash.toInteger('0b101010');
    lodash.toInteger('0o12345');
    lodash.toInteger('0x1a2b3c');
    lodash.toInteger('1.1');
  });
});
