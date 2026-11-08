import { escapeRegExp as escapeRegExpToolkit } from 'es-toolkit';
import { escapeRegExp as escapeRegExpCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('escape', () => {
  const longString = '^$.*+?()[]{}|\\'.repeat(100);
  bench('es-toolkit/escapeRegExp', () => {
    escapeRegExpToolkit('^$.*+?()[]{}|\\');
  });

  bench('es-toolkit/compat/escapeRegExp', () => {
    escapeRegExpCompatToolkit('^$.*+?()[]{}|\\');
  });

  bench('lodash/escapeRegExp', () => {
    lodash.escapeRegExp('^$.*+?()[]{}|\\');
  });

  bench('es-toolkit/escapeRegExp - long string', () => {
    escapeRegExpToolkit(longString);
  });

  bench('es-toolkit/compat/escapeRegExp - long string', () => {
    escapeRegExpCompatToolkit(longString);
  });

  bench('lodash/escapeRegExp long string', () => {
    lodash.escapeRegExp(longString);
  });
});
