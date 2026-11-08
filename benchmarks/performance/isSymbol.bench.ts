import { isSymbol as isSymbolToolkit } from 'es-toolkit';
import { isSymbol as isSymbolToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isSymbol', () => {
  bench('es-toolkit/isSymbol', () => {
    isSymbolToolkit(Symbol('a'));
    isSymbolToolkit(Symbol.for('a'));
    isSymbolToolkit(Symbol.iterator);
    isSymbolToolkit('');
    isSymbolToolkit({});
    isSymbolToolkit(123);
  });

  bench('es-toolkit/compat/isSymbol', () => {
    isSymbolToolkitCompat(Symbol('a'));
    isSymbolToolkitCompat(Symbol.for('a'));
    isSymbolToolkitCompat(Symbol.iterator);
    isSymbolToolkitCompat('');
    isSymbolToolkitCompat({});
    isSymbolToolkitCompat(123);
  });

  bench('lodash/isSymbol', () => {
    lodash.isSymbol(Symbol('a'));
    lodash.isSymbol(Symbol.for('a'));
    lodash.isSymbol(Symbol.iterator);
    lodash.isSymbol('');
    lodash.isSymbol({});
    lodash.isSymbol(123);
  });
});
