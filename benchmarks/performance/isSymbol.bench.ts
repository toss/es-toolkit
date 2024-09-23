import { bench, describe } from 'vitest';
import { isSymbol as isSymbolToolkit } from 'es-toolkit/predicate';
import { isSymbol as isSymbolToolkitCompat } from 'es-toolkit/compat';
import { isSymbol as isSymbolLodash } from 'lodash';

describe('isSymbol', () => {
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
    isSymbolLodash(Symbol('a'));
    isSymbolLodash(Symbol.for('a'));
    isSymbolLodash(Symbol.iterator);
    isSymbolLodash('');
    isSymbolLodash({});
    isSymbolLodash(123);
  });
});
