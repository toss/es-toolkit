import { escape as escapeToolkit } from 'es-toolkit';
import { escape as escapeToolkitCompat } from 'es-toolkit/compat';
import { escape as escapeLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('escape', () => {
  bench('es-toolkit/escape', () => {
    escapeToolkit('fred, barney, & pebbles');
  });

  bench('es-toolkit/compat/escape', () => {
    escapeToolkitCompat('fred, barney, & pebbles');
  });

  bench('lodash/escape', () => {
    escapeLodash('fred, barney, & pebbles');
  });
});

describe('escape (long string)', () => {
  const longString = 'fred, barney, & pebbles'.repeat(100);

  bench('es-toolkit/escape', () => {
    escapeToolkit(longString);
  });

  bench('es-toolkit/compat/escape', () => {
    escapeToolkitCompat(longString);
  });

  bench('lodash/escape', () => {
    escapeLodash(longString);
  });
});
