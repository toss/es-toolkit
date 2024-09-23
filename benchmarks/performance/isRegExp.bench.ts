import { bench, describe } from 'vitest';
import { isRegExp as isRegExpToolkit } from 'es-toolkit/predicate';
import { isRegExp as isRegExpToolkitCompat } from 'es-toolkit/compat';
import { isRegExp as isRegExpLodash } from 'lodash';

describe('isRegExp', () => {
  bench('es-toolkit/isRegExp', () => {
    isRegExpToolkit(new RegExp(''));
    isRegExpToolkit(/abc/);
    isRegExpToolkit('/abc/');
  });

  bench('es-toolkit/compat/isRegExp', () => {
    isRegExpToolkitCompat(new RegExp(''));
    isRegExpToolkitCompat(/abc/);
    isRegExpToolkitCompat('/abc/');
  });

  bench('lodash/isRegExp', () => {
    isRegExpLodash(new RegExp(''));
    isRegExpLodash(/abc/);
    isRegExpLodash('/abc/');
  });
});
