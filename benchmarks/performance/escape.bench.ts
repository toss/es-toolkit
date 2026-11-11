import { escape as escapeToolkit } from 'es-toolkit';
import { escape as escapeToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('escape', () => {
  bench('es-toolkit/escape', () => {
    do_not_optimize(escapeToolkit('fred, barney, & pebbles'));
  });

  bench('es-toolkit/compat/escape', () => {
    do_not_optimize(escapeToolkitCompat('fred, barney, & pebbles'));
  });

  bench('lodash/escape', () => {
    do_not_optimize(lodash.escape('fred, barney, & pebbles'));
  });
});

group('escape (long string)', () => {
  const longString = 'fred, barney, & pebbles'.repeat(100);

  bench('es-toolkit/escape', () => {
    do_not_optimize(escapeToolkit(longString));
  });

  bench('es-toolkit/compat/escape', () => {
    do_not_optimize(escapeToolkitCompat(longString));
  });

  bench('lodash/escape', () => {
    do_not_optimize(lodash.escape(longString));
  });
});
