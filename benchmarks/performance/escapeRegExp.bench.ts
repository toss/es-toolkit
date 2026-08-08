import { bench, describe } from 'vitest';
import { escapeRegExp as escapeRegExpToolkit } from 'es-toolkit';
import { escapeRegExp as escapeRegExpCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { escapeRegExp: escapeRegExpLodash } = lodash;

describe('escape', () => {
  const longString = '^$.*+?()[]{}|\\'.repeat(100);
  bench('es-toolkit/escapeRegExp', () => {
    escapeRegExpToolkit('^$.*+?()[]{}|\\');
  });

  bench('es-toolkit/compat/escapeRegExp', () => {
    escapeRegExpCompatToolkit('^$.*+?()[]{}|\\');
  });

  bench('lodash/escapeRegExp', () => {
    escapeRegExpLodash('^$.*+?()[]{}|\\');
  });

  bench('es-toolkit/escapeRegExp - long string', () => {
    escapeRegExpToolkit(longString);
  });

  bench('es-toolkit/compat/escapeRegExp - long string', () => {
    escapeRegExpCompatToolkit(longString);
  });

  bench('lodash/escapeRegExp long string', () => {
    escapeRegExpLodash(longString);
  });
});
