import { bench, describe } from 'vitest';
import { isRegExp as isRegExpToolkit_ } from 'es-toolkit';
import { isRegExp as isRegExpToolkitCompat_ } from 'es-toolkit/compat';
import { isRegExp as isRegExpLodash_ } from 'lodash';

const isRegExpToolkit = isRegExpToolkit_;
const isRegExpToolkitCompat = isRegExpToolkitCompat_;
const isRegExpLodash = isRegExpLodash_;

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
