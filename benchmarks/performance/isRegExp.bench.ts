import { bench, describe } from 'vitest';
import { isRegExp as isRegExpToolkit } from 'es-toolkit';
import { isRegExp as isRegExpLodash } from 'lodash';

describe('isRegExp', () => {
  bench('es-toolkit/isRegExp', () => {
    isRegExpToolkit(new RegExp(''));
    isRegExpToolkit(/abc/);
    isRegExpToolkit('/abc/');
  });

  bench('lodash/isRegExp', () => {
    isRegExpLodash(new RegExp(''));
    isRegExpLodash(/abc/);
    isRegExpLodash('/abc/');
  });
});
