import { bench, describe } from 'vitest';
import { join as joinToolkit_ } from 'es-toolkit/compat';
import { join as joinLodash_ } from 'lodash';

const joinToolkit = joinToolkit_;
const joinLodash = joinLodash_;

describe('join', () => {
  bench('es-toolkit', () => {
    joinToolkit([1, 2, 3], ',');
  });

  bench('lodash', () => {
    joinLodash([1, 2, 3], ',');
  });
});
