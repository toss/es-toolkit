import { bench, describe } from 'vitest';
import { replace as replaceToolkitCompat_ } from 'es-toolkit/compat';
import { replace as replaceLodash_ } from 'lodash';

const replaceToolkitCompat = replaceToolkitCompat_;
const replaceLodash = replaceLodash_;

describe('replace', () => {
  bench('es-toolkit/compat/replace', () => {
    replaceToolkitCompat('abc', 'de', '123');
    replaceToolkitCompat('abc', /[bd]/g, '-');
    replaceToolkitCompat('abc', 'de', substring => substring.toUpperCase());
    replaceToolkitCompat('abc', /[bd]/g, substring => substring.toUpperCase());
  });

  bench('lodash/replace', () => {
    replaceLodash('abc', 'de', '123');
    replaceLodash('abc', /[bd]/g, '-');
    replaceLodash('abc', 'de', substring => substring.toUpperCase());
    replaceLodash('abc', /[bd]/g, substring => substring.toUpperCase());
  });
});
