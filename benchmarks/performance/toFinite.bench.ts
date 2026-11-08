import { toFinite as toFiniteToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('toFinite', () => {
  bench('es-toolkit/compat/toFinite', () => {
    do_not_optimize(toFiniteToolkitCompat({ valueOf: () => 1 }));
    do_not_optimize(toFiniteToolkitCompat({ valueOf: () => 2 }));
    do_not_optimize(toFiniteToolkitCompat({ toString: () => '3' }));
    do_not_optimize(toFiniteToolkitCompat('0b101010'));
    do_not_optimize(toFiniteToolkitCompat('0o12345'));
    do_not_optimize(toFiniteToolkitCompat('0x1a2b3c'));
    do_not_optimize(toFiniteToolkitCompat('1.1'));
  });

  bench('lodash/toFinite', () => {
    do_not_optimize(lodash.toFinite({ valueof: () => 1 }));
    do_not_optimize(lodash.toFinite({ valueof: () => 2 }));
    do_not_optimize(lodash.toFinite({ toString: () => '3' }));
    do_not_optimize(lodash.toFinite('0b101010'));
    do_not_optimize(lodash.toFinite('0o12345'));
    do_not_optimize(lodash.toFinite('0x1a2b3c'));
    do_not_optimize(lodash.toFinite('1.1'));
  });
});
