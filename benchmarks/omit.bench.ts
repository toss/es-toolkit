import { bench, describe } from 'vitest';
import { omit as omitToolkit } from 'es-toolkit';
import { omit as omitLodash } from 'lodash';

describe('omit', () => {
  bench('es-toolkit/omit', () => {
    omitToolkit({ foo: 1, bar: 2, baz: 3 }, ['foo', 'bar']);
  });

  bench('lodash/omit', () => {
    omitLodash({ foo: 1, bar: 2, baz: 3 }, ['foo', 'bar']);
  });
});
