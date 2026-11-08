import { isSymbol as isSymbolToolkit } from 'es-toolkit';
import { isSymbol as isSymbolToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isSymbol', () => {
  bench('es-toolkit/isSymbol', () => {
    do_not_optimize(isSymbolToolkit(Symbol('a')));
    do_not_optimize(isSymbolToolkit(Symbol.for('a')));
    do_not_optimize(isSymbolToolkit(Symbol.iterator));
    do_not_optimize(isSymbolToolkit(''));
    do_not_optimize(isSymbolToolkit({}));
    do_not_optimize(isSymbolToolkit(123));
  });

  bench('es-toolkit/compat/isSymbol', () => {
    do_not_optimize(isSymbolToolkitCompat(Symbol('a')));
    do_not_optimize(isSymbolToolkitCompat(Symbol.for('a')));
    do_not_optimize(isSymbolToolkitCompat(Symbol.iterator));
    do_not_optimize(isSymbolToolkitCompat(''));
    do_not_optimize(isSymbolToolkitCompat({}));
    do_not_optimize(isSymbolToolkitCompat(123));
  });

  bench('lodash/isSymbol', () => {
    do_not_optimize(lodash.isSymbol(Symbol('a')));
    do_not_optimize(lodash.isSymbol(Symbol.for('a')));
    do_not_optimize(lodash.isSymbol(Symbol.iterator));
    do_not_optimize(lodash.isSymbol(''));
    do_not_optimize(lodash.isSymbol({}));
    do_not_optimize(lodash.isSymbol(123));
  });
});
