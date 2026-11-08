import { toNumber as toNumberToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('toNumber', () => {
  bench('es-toolkit/compat/toNumber', () => {
    do_not_optimize(toNumberToolkitCompat({ valueOf: () => 1 }));
    do_not_optimize(toNumberToolkitCompat({ valueOf: () => 2 }));
    do_not_optimize(toNumberToolkitCompat({ toString: () => '3' }));
    do_not_optimize(toNumberToolkitCompat('0b101010'));
    do_not_optimize(toNumberToolkitCompat('0o12345'));
    do_not_optimize(toNumberToolkitCompat('0x1a2b3c'));
    do_not_optimize(toNumberToolkitCompat('1.1'));
  });

  bench('lodash/toNumber', () => {
    do_not_optimize(lodash.toNumber({ valueof: () => 1 }));
    do_not_optimize(lodash.toNumber({ valueof: () => 2 }));
    do_not_optimize(lodash.toNumber({ toString: () => '3' }));
    do_not_optimize(lodash.toNumber('0b101010'));
    do_not_optimize(lodash.toNumber('0o12345'));
    do_not_optimize(lodash.toNumber('0x1a2b3c'));
    do_not_optimize(lodash.toNumber('1.1'));
  });
});
