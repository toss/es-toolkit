import { escapeRegExp as escapeRegExpToolkit } from 'es-toolkit';
import { escapeRegExp as escapeRegExpCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('escape', () => {
  const longString = '^$.*+?()[]{}|\\'.repeat(100);
  bench('es-toolkit/escapeRegExp', () => {
    do_not_optimize(escapeRegExpToolkit('^$.*+?()[]{}|\\'));
  });

  bench('es-toolkit/compat/escapeRegExp', () => {
    do_not_optimize(escapeRegExpCompatToolkit('^$.*+?()[]{}|\\'));
  });

  bench('lodash/escapeRegExp', () => {
    do_not_optimize(lodash.escapeRegExp('^$.*+?()[]{}|\\'));
  });

  bench('es-toolkit/escapeRegExp - long string', () => {
    do_not_optimize(escapeRegExpToolkit(longString));
  });

  bench('es-toolkit/compat/escapeRegExp - long string', () => {
    do_not_optimize(escapeRegExpCompatToolkit(longString));
  });

  bench('lodash/escapeRegExp long string', () => {
    do_not_optimize(lodash.escapeRegExp(longString));
  });
});
