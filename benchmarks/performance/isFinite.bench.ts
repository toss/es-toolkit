import { isFinite as isFiniteToolkit_ } from 'es-toolkit/compat';
import { isFinite as isFiniteLodash_ } from 'lodash';
import { bench, describe } from 'vitest';

const isFiniteToolkit = isFiniteToolkit_;
const isFiniteLodash = isFiniteLodash_;

describe('isFinite', () => {
  bench('es-toolkit/isFinite', () => {
    isFiniteToolkit(1);
    isFiniteToolkit(1.12);
    isFiniteToolkit(Infinity);
    isFiniteToolkit(-Infinity);
    isFiniteToolkit([]);
    isFiniteToolkit({});
    isFiniteToolkit('1');
  });

  bench('lodash/isFinite', () => {
    isFiniteLodash(1);
    isFiniteLodash(1.12);
    isFiniteLodash(Infinity);
    isFiniteLodash(-Infinity);
    isFiniteLodash([]);
    isFiniteLodash({});
    isFiniteLodash('1');
  });
});
