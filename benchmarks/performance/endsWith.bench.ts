import { bench, describe } from 'vitest';
import { endsWith as endsWithToolkit } from 'es-toolkit/compat';
import { endsWith as endsWithLodash } from 'lodash';

describe('endsWith', () => {
  bench('es-toolkit/endsWith', () => {
    const str = 'fooBar';
    endsWithToolkit(str, 'Bar');
    endsWithToolkit(str, 'foo', 3);
  });

  bench('lodash/endsWith', () => {
    const str = 'fooBar';
    endsWithLodash(str, 'Bar');
    endsWithLodash(str, 'foo', 3);
  });
});
