import { bench, describe } from 'vitest';
import { defer as deferToolkit_ } from 'es-toolkit/compat';
import { defer as deferLodash_ } from 'lodash';

const deferToolkit = deferToolkit_;
const deferLodash = deferLodash_;

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
