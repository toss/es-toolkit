import { bench, describe } from 'vitest';
import { unescape as unescapeToolkit_ } from 'es-toolkit';
import { unescape as unescapeCompatToolkit_ } from 'es-toolkit/compat';
import { unescape as unescapeLodash_ } from 'lodash';

const unescapeToolkit = unescapeToolkit_;
const unescapeCompatToolkit = unescapeCompatToolkit_;
const unescapeLodash = unescapeLodash_;

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
