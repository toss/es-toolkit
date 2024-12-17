import { bench, describe } from 'vitest';
import { escapeRegExp as escapeRegExpToolkit_ } from 'es-toolkit';
import { escapeRegExp as escapeRegExpCompatToolkit_ } from 'es-toolkit/compat';
import { escapeRegExp as escapeRegExpLodash_ } from 'lodash';

const escapeRegExpToolkit = escapeRegExpToolkit_;
const escapeRegExpCompatToolkit = escapeRegExpCompatToolkit_;
const escapeRegExpLodash = escapeRegExpLodash_;

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
