import { bench, describe } from 'vitest';
import { unescape as unescapeToolkit } from 'es-toolkit';
import { unescape as unescapeLodash } from 'lodash';

describe('unescape', () => {
  const longString = 'fred, barney, &amp; pebbles'.repeat(50);
  bench('es-toolkit/unescape', () => {
    unescapeToolkit('fred, barney, &amp; pebbles');
  });

  bench('lodash/unescape', () => {
    unescapeLodash('fred, barney, &amp; pebbles');
  });

  bench('es-toolkit/unescape - long string', () => {
    unescapeToolkit(longString);
  });

  bench('lodash/unescape long string', () => {
    unescapeLodash(longString);
  });
});
