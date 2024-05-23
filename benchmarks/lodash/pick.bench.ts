import { bench, describe } from 'vitest';
import { pick as pickToolkit } from 'es-toolkit';
import { pick as pickLodash } from 'lodash';

describe('pick', () => {
  bench('es-toolkit', () => {
    pickToolkit({ foo: 1, bar: 2, baz: 3 }, ['foo', 'bar'])
  })

  bench('lodash', () => {
    pickLodash({ foo: 1, bar: 2, baz: 3 }, ['foo', 'bar'])
  })
});