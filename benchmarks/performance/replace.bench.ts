import { replace as replaceToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('replace', () => {
  bench('es-toolkit/compat/replace', () => {
    replaceToolkitCompat('abc', 'de', '123');
    replaceToolkitCompat('abc', /[bd]/g, '-');
    replaceToolkitCompat('abc', 'de', substring => substring.toUpperCase());
    replaceToolkitCompat('abc', /[bd]/g, substring => substring.toUpperCase());
  });

  bench('lodash/replace', () => {
    lodash.replace('abc', 'de', '123');
    lodash.replace('abc', /[bd]/g, '-');
    lodash.replace('abc', 'de', substring => substring.toUpperCase());
    lodash.replace('abc', /[bd]/g, substring => substring.toUpperCase());
  });
});
