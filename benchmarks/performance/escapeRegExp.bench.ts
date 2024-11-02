import { bench, describe } from 'vitest';
import { escapeRegExp as escapeRegExpToolkit_ } from 'es-toolkit';
import { escapeRegExp as escapeRegExpLodash_ } from 'lodash';

const escapeRegExpToolkit = escapeRegExpToolkit_;
const escapeRegExpLodash = escapeRegExpLodash_;

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
