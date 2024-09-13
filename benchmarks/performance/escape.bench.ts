import { bench, describe } from 'vitest';
import { escape as escapeToolkit } from 'es-toolkit';
import { escape as escapeLodash } from 'lodash';

describe('escape', () => {
  const longString = 'fred, barney, & pebbles'.repeat(100);
  bench('es-toolkit/escape', () => {
    escapeToolkit('fred, barney, & pebbles');
  });

  bench('lodash/escape', () => {
    escapeLodash('fred, barney, & pebbles');
  });

  bench('es-toolkit/escape - long string', () => {
    escapeToolkit(longString);
  });

  bench('lodash/escape long string', () => {
    escapeLodash(longString);
  });
});
