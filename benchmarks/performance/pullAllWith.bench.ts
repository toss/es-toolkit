import { pullAllWith as pullAllWithToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('pullAllWith', () => {
  const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }];
  const valuesToRemove = [{ x: 2 }, { x: 4 }];

  const comparator = (a: { x: number }, b: { x: number }) => a.x === b.x;

  bench('es-toolkit/pullAllWith', () => {
    do_not_optimize(pullAllWithToolkit([...array], valuesToRemove, comparator));
  });

  bench('lodash/pullAllWith', () => {
    do_not_optimize(lodash.pullAllWith([...array], valuesToRemove, comparator));
  });
});

group('pullAllWith/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ x: i }));
  const valuesToRemove = Array.from({ length: 1000 }, (_, i) => ({ x: i + 1000 }));

  const comparator = (a: { x: number }, b: { x: number }) => a.x === b.x;

  bench('es-toolkit/pullAllWith', () => {
    do_not_optimize(pullAllWithToolkit([...largeArray], valuesToRemove, comparator));
  });

  bench('lodash/pullAllWith', () => {
    do_not_optimize(lodash.pullAllWith([...largeArray], valuesToRemove, comparator));
  });
});

describe('pullAllWith/sparseArray', () => {
  const array = new Array<number>(10000);
  array[5000] = 100;
  const valuesToRemove = Array.from({ length: 100 }, (_, i) => i);

  bench('es-toolkit/pullAllWith', () => {
    pullAllWithToolkit(array.slice(), valuesToRemove);
  });

  bench('lodash/pullAllWith', () => {
    pullAllWithLodash(array.slice(), valuesToRemove);
  });
});
