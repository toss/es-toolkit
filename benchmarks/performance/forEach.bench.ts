import { bench, describe } from 'vitest';
import { forEach as forEachToolkit_ } from 'es-toolkit/compat';
import { forEach as forEachLodash_ } from 'lodash';

const forEachToolkit = forEachToolkit_;
const forEachLodash = forEachLodash_;

describe('forEach', () => {
  bench('es-toolkit/compat/forEach', () => {
    forEachToolkit([1, 2, 3, 4, 5, 6], x => x + 3);
  });

  bench('lodash/forEach', () => {
    forEachLodash([1, 2, 3, 4, 5, 6], x => x + 3);
  });
});

describe('forEach/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/compat/forEach', () => {
    forEachToolkit(largeArray, x => x + 3);
  });

  bench('lodash/forEach', () => {
    forEachLodash(largeArray, x => x + 3);
  });
});

describe('forEach/string', () => {
  const string = [1, 2, 3, 4, 5, 6].join('');

  bench('es-toolkit/compat/forEach', () => {
    forEachToolkit(string, x => x.toUpperCase());
  });

  bench('lodash/forEach', () => {
    forEachLodash(string, x => x.toUpperCase());
  });
});

describe('forEach/object', () => {
  const string = Object.fromEntries([1, 2, 3, 4, 5, 6].map(value => [value, value]));

  bench('es-toolkit/compat/forEach', () => {
    forEachToolkit(string, x => x + 3);
  });

  bench('lodash/forEach', () => {
    forEachLodash(string, x => x + 3);
  });
});
