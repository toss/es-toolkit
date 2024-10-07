import { bench, describe } from 'vitest';
import { escape as escapeToolkit_ } from 'es-toolkit';
import { escape as escapeToolkitCompat_ } from 'es-toolkit/compat';
import { escape as escapeLodash_ } from 'lodash';

const escapeToolkit = escapeToolkit_;
const escapeToolkitCompat = escapeToolkitCompat_;
const escapeLodash = escapeLodash_;

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
