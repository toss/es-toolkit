import { bench, describe } from 'vitest';
import { startsWith as startsWithToolkit_ } from 'es-toolkit/compat';
import { startsWith as startsWithLodash_ } from 'lodash';

const startsWithToolkit = startsWithToolkit_;
const startsWithLodash = startsWithLodash_;

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
