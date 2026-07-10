import { bench, describe } from 'vitest';
import { defer as deferToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { defer: deferLodash } = lodash;

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
