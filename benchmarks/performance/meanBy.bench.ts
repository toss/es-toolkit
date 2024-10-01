import { bench, describe } from 'vitest';
import { meanBy as meanByToolkit_ } from 'es-toolkit';
import { meanBy as meanByLodash_ } from 'lodash';

const meanByToolkit = meanByToolkit_;
const meanByLodash = meanByLodash_;

describe('meanBy', () => {
  bench('es-toolkit/meanBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    meanByToolkit(items, x => x.a);
  });

  bench('lodash/meanBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    meanByLodash(items, x => x.a);
  });
});
