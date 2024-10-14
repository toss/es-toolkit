import { unescape as unescapeToolkit } from 'es-toolkit';
import { unescape as unescapeLodash } from 'lodash';
import { bench, describe } from '../bench';

const longString = 'fred, barney, &amp; pebbles'.repeat(50);

describe('unescape', () => {
  bench('es-toolkit/unescape', () => {
    unescapeToolkit('fred, barney, &amp; pebbles');
  });

  bench('lodash/unescape', () => {
    unescapeLodash('fred, barney, &amp; pebbles');
  });
});

describe('unescape/long', () => {
  bench('es-toolkit/unescape - long string', () => {
    unescapeToolkit(longString);
  });

  bench('lodash/unescape long string', () => {
    unescapeLodash(longString);
  });
});
