import { pullAllWith as pullAllWithToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('pullAllWith', () => {
  const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }];
  const valuesToRemove = [{ x: 2 }, { x: 4 }];

  const comparator = (a: { x: number }, b: { x: number }) => a.x === b.x;

  bench('es-toolkit/pullAllWith', () => {
    pullAllWithToolkit([...array], valuesToRemove, comparator);
  });

  bench('lodash/pullAllWith', () => {
    lodash.pullAllWith([...array], valuesToRemove, comparator);
  });
});

group('pullAllWith/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ x: i }));
  const valuesToRemove = Array.from({ length: 1000 }, (_, i) => ({ x: i + 1000 }));

  const comparator = (a: { x: number }, b: { x: number }) => a.x === b.x;

  bench('es-toolkit/pullAllWith', () => {
    pullAllWithToolkit([...largeArray], valuesToRemove, comparator);
  });

  bench('lodash/pullAllWith', () => {
    lodash.pullAllWith([...largeArray], valuesToRemove, comparator);
  });
});
