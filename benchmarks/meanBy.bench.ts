import { bench, describe } from 'vitest';
import { meanBy as meanByToolkit } from 'es-toolkit';
import { meanBy as meanByLodash } from 'lodash';

describe('meanBy', () => {
  describe('small array', () => {
    bench('es-toolkit/meanBy', () => {
      const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
      meanByToolkit(items, x => x.a);
    });

    bench('lodash/meanBy', () => {
      const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
      meanByLodash(items, x => x.a);
    });
  });

  describe('large array', () => {
    bench('es-toolkit/meanBy', () => {
      const items = Array.from({ length: 1000 }, (_, i) => ({ a: i }));
      meanByToolkit(items, x => x.a);
    });

    bench('lodash/meanBy', () => {
      const items = Array.from({ length: 1000 }, (_, i) => ({ a: i }));
      meanByLodash(items, x => x.a);
    });
  });
});
