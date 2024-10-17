import { defer as deferToolkit } from 'es-toolkit/compat';
import { defer as deferLodash } from 'lodash';
import { bench, describe } from '../bench';

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
