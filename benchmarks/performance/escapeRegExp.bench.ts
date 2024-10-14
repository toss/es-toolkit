import { escapeRegExp as escapeRegExpToolkit } from 'es-toolkit';
import { escapeRegExp as escapeRegExpLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('escape', () => {
  const longString = '^$.*+?()[]{}|\\'.repeat(100);
  bench('es-toolkit/escapeRegExp', () => {
    escapeRegExpToolkit('^$.*+?()[]{}|\\');
  });

  bench('lodash/escapeRegExp', () => {
    escapeRegExpLodash('^$.*+?()[]{}|\\');
  });

  bench('es-toolkit/escapeRegExp - long string', () => {
    escapeRegExpToolkit(longString);
  });

  bench('lodash/escapeRegExp long string', () => {
    escapeRegExpLodash(longString);
  });
});
