import { startsWith as startsWithToolkit } from 'es-toolkit/compat';
import { startsWith as startsWithLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('startsWith', () => {
  bench('es-toolkit/startsWith', () => {
    const str = 'fooBar';
    startsWithToolkit(str, 'foo');
    startsWithToolkit(str, 'Bar', 3);
  });

  bench('lodash/startsWith', () => {
    const str = 'fooBar';
    startsWithLodash(str, 'foo');
    startsWithLodash(str, 'Bar', 3);
  });
});
