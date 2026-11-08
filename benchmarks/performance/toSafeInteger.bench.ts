import { toSafeInteger as toSafeIntegerToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('toSafeInteger', () => {
  bench('es-toolkit/compat/toSafeInteger', () => {
    toSafeIntegerToolkitCompat({ valueOf: () => 1 });
    toSafeIntegerToolkitCompat({ valueOf: () => 2 });
    toSafeIntegerToolkitCompat({ toString: () => '3' });
    toSafeIntegerToolkitCompat('0b101010');
    toSafeIntegerToolkitCompat('0o12345');
    toSafeIntegerToolkitCompat('0x1a2b3c');
    toSafeIntegerToolkitCompat('1.1');
  });

  bench('lodash/toSafeInteger', () => {
    lodash.toSafeInteger({ valueof: () => 1 });
    lodash.toSafeInteger({ valueof: () => 2 });
    lodash.toSafeInteger({ toString: () => '3' });
    lodash.toSafeInteger('0b101010');
    lodash.toSafeInteger('0o12345');
    lodash.toSafeInteger('0x1a2b3c');
    lodash.toSafeInteger('1.1');
  });
});
