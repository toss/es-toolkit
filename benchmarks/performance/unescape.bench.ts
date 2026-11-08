import { unescape as unescapeToolkit } from 'es-toolkit';
import { unescape as unescapeCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const longString = 'fred, barney, &amp; pebbles'.repeat(50);

group('unescape', () => {
  bench('es-toolkit/unescape', () => {
    do_not_optimize(unescapeToolkit('fred, barney, &amp; pebbles'));
  });

  bench('es-toolkit/compat/unescape', () => {
    do_not_optimize(unescapeCompatToolkit('fred, barney, &amp; pebbles'));
  });

  bench('lodash/unescape', () => {
    do_not_optimize(lodash.unescape('fred, barney, &amp; pebbles'));
  });
});

group('unescape/long', () => {
  bench('es-toolkit/unescape - long string', () => {
    do_not_optimize(unescapeToolkit(longString));
  });

  bench('es-toolkit/compat/unescape - long string', () => {
    do_not_optimize(unescapeCompatToolkit(longString));
  });

  bench('lodash/unescape long string', () => {
    do_not_optimize(lodash.unescape(longString));
  });
});
