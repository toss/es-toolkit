import { bench, describe } from 'vitest';
import { defer as deferToolkit } from 'es-toolkit/compat';
import { defer as deferLodash } from 'lodash';

describe('defer', () => {
  bench('es-toolkit/defer', () => {
    const id = deferToolkit(() => {});
    clearTimeout(id);
  });

  bench('lodash/defer', () => {
    const id = deferLodash(() => {});
    clearTimeout(id);
  });
});
