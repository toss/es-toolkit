import { bench, describe } from 'vitest';
import { isSymbol as isSymbolToolkit } from 'es-toolkit';
import { isSymbol as isSymbolLodash } from 'lodash';

describe('isSymbol', () => {
  bench('es-toolkit/isSymbol', () => {
    isSymbolToolkit(Symbol('a'));
    isSymbolToolkit(Symbol.for('a'));
    isSymbolToolkit(Symbol.iterator);
    isSymbolToolkit(Object(Symbol('a')));
    isSymbolToolkit('');
    isSymbolToolkit({});
    isSymbolToolkit(123);
  });
  bench('lodash/isSymbol', () => {
    isSymbolLodash(Symbol('a'));
    isSymbolLodash(Symbol.for('a'));
    isSymbolLodash(Symbol.iterator);
    isSymbolLodash(Object(Symbol('a')));
    isSymbolLodash('');
    isSymbolLodash({});
    isSymbolLodash(123);
  });
});
