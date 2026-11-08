import { toSafeInteger as toSafeIntegerToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('toSafeInteger', () => {
  bench('es-toolkit/compat/toSafeInteger', () => {
    do_not_optimize(toSafeIntegerToolkitCompat({ valueOf: () => 1 }));
    do_not_optimize(toSafeIntegerToolkitCompat({ valueOf: () => 2 }));
    do_not_optimize(toSafeIntegerToolkitCompat({ toString: () => '3' }));
    do_not_optimize(toSafeIntegerToolkitCompat('0b101010'));
    do_not_optimize(toSafeIntegerToolkitCompat('0o12345'));
    do_not_optimize(toSafeIntegerToolkitCompat('0x1a2b3c'));
    do_not_optimize(toSafeIntegerToolkitCompat('1.1'));
  });

  bench('lodash/toSafeInteger', () => {
    do_not_optimize(lodash.toSafeInteger({ valueof: () => 1 }));
    do_not_optimize(lodash.toSafeInteger({ valueof: () => 2 }));
    do_not_optimize(lodash.toSafeInteger({ toString: () => '3' }));
    do_not_optimize(lodash.toSafeInteger('0b101010'));
    do_not_optimize(lodash.toSafeInteger('0o12345'));
    do_not_optimize(lodash.toSafeInteger('0x1a2b3c'));
    do_not_optimize(lodash.toSafeInteger('1.1'));
  });
});
