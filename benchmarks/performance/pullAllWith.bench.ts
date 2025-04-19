import { bench, describe } from 'vitest';
import { pullAllWith as pullAllWithToolkit_ } from 'es-toolkit/compat';
import { pullAllWith as pullAllWithLodash_ } from 'lodash';

const pullAllWithToolkit = pullAllWithToolkit_;
const pullAllWithLodash = pullAllWithLodash_;

describe('pullAllWith', () => {
  const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }];
  const valuesToRemove = [{ x: 2 }, { x: 4 }];

  const comparator = (a, b) => a.x === b.x;

  bench('es-toolkit/pullAllWith', () => {
    pullAllWithToolkit([...array], valuesToRemove, comparator);
  });

  bench('lodash/pullAllWith', () => {
    pullAllWithLodash([...array], valuesToRemove, comparator);
  });
});

describe('pullAllWith/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ x: i }));
  const valuesToRemove = Array.from({ length: 1000 }, (_, i) => ({ x: i + 1000 }));

  const comparator = (a, b) => a.x === b.x;

  bench('es-toolkit/pullAllWith', () => {
    pullAllWithToolkit([...largeArray], valuesToRemove, comparator);
  });

  bench('lodash/pullAllWith', () => {
    pullAllWithLodash([...largeArray], valuesToRemove, comparator);
  });
});
