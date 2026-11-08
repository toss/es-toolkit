import { toInteger as toIntegerToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('toInteger', () => {
  bench('es-toolkit/compat/toInteger', () => {
    do_not_optimize(toIntegerToolkitCompat({ valueOf: () => 1 }));
    do_not_optimize(toIntegerToolkitCompat({ valueOf: () => 2 }));
    do_not_optimize(toIntegerToolkitCompat({ toString: () => '3' }));
    do_not_optimize(toIntegerToolkitCompat('0b101010'));
    do_not_optimize(toIntegerToolkitCompat('0o12345'));
    do_not_optimize(toIntegerToolkitCompat('0x1a2b3c'));
    do_not_optimize(toIntegerToolkitCompat('1.1'));
  });

  bench('lodash/toInteger', () => {
    do_not_optimize(lodash.toInteger({ valueof: () => 1 }));
    do_not_optimize(lodash.toInteger({ valueof: () => 2 }));
    do_not_optimize(lodash.toInteger({ toString: () => '3' }));
    do_not_optimize(lodash.toInteger('0b101010'));
    do_not_optimize(lodash.toInteger('0o12345'));
    do_not_optimize(lodash.toInteger('0x1a2b3c'));
    do_not_optimize(lodash.toInteger('1.1'));
  });
});
