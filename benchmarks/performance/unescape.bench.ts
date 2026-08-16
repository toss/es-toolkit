import { bench, describe } from 'vitest';
import { unescape as unescapeToolkit } from 'es-toolkit';
import { unescape as unescapeCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { unescape: unescapeLodash } = lodash;

const longString = 'fred, barney, &amp; pebbles'.repeat(50);

describe('unescape', () => {
  bench('es-toolkit/unescape', () => {
    unescapeToolkit('fred, barney, &amp; pebbles');
  });

  bench('es-toolkit/compat/unescape', () => {
    unescapeCompatToolkit('fred, barney, &amp; pebbles');
  });

  bench('lodash/unescape', () => {
    unescapeLodash('fred, barney, &amp; pebbles');
  });
});

describe('unescape/long', () => {
  bench('es-toolkit/unescape - long string', () => {
    unescapeToolkit(longString);
  });

  bench('es-toolkit/compat/unescape - long string', () => {
    unescapeCompatToolkit(longString);
  });

  bench('lodash/unescape long string', () => {
    unescapeLodash(longString);
  });
});
