import { bench, describe } from 'vitest';
import { get as getToolkit_ } from 'es-toolkit/compat';
import { get as getLodash_ } from 'lodash';

const getToolkit = getToolkit_;
const getLodash = getLodash_;

describe('get with simple string', () => {
  bench('es-toolkit/get', () => {
    getToolkit({ a: 1, b: 2 }, 'a');
  });

  bench('lodash/get', () => {
    getLodash({ a: 1, b: 2 }, 'a');
  });
});

describe('get with string', () => {
  bench('es-toolkit/get', () => {
    getToolkit({ a: { b: 3 } }, 'a.b');
  });

  bench('lodash/get', () => {
    getLodash({ a: { b: 3 } }, 'a.b');
  });
});

describe('get with string array', () => {
  bench('es-toolkit/get', () => {
    getToolkit({ a: { b: 3 } }, ['a', 'b']);
  });

  bench('lodash/get', () => {
    getLodash({ a: { b: 3 } }, ['a', 'b']);
  });
});
