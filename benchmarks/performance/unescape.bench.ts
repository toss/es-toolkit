import { unescape as unescapeToolkit } from 'es-toolkit';
import { unescape as unescapeCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const longString = 'fred, barney, &amp; pebbles'.repeat(50);

group('unescape', () => {
  bench('es-toolkit/unescape', () => {
    unescapeToolkit('fred, barney, &amp; pebbles');
  });

  bench('es-toolkit/compat/unescape', () => {
    unescapeCompatToolkit('fred, barney, &amp; pebbles');
  });

  bench('lodash/unescape', () => {
    lodash.unescape('fred, barney, &amp; pebbles');
  });
});

group('unescape/long', () => {
  bench('es-toolkit/unescape - long string', () => {
    unescapeToolkit(longString);
  });

  bench('es-toolkit/compat/unescape - long string', () => {
    unescapeCompatToolkit(longString);
  });

  bench('lodash/unescape long string', () => {
    lodash.unescape(longString);
  });
});
