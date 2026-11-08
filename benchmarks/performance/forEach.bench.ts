import { forEach as forEachToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('forEach', () => {
  bench('es-toolkit/compat/forEach', () => {
    do_not_optimize(forEachToolkit([1, 2, 3, 4, 5, 6], x => x + 3));
  });

  bench('lodash/forEach', () => {
    do_not_optimize(lodash.forEach([1, 2, 3, 4, 5, 6], x => x + 3));
  });
});

group('forEach/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/compat/forEach', () => {
    do_not_optimize(forEachToolkit(largeArray, x => x + 3));
  });

  bench('lodash/forEach', () => {
    do_not_optimize(lodash.forEach(largeArray, x => x + 3));
  });
});

group('forEach/string', () => {
  const string = [1, 2, 3, 4, 5, 6].join('');

  bench('es-toolkit/compat/forEach', () => {
    do_not_optimize(forEachToolkit(string, x => x.toUpperCase()));
  });

  bench('lodash/forEach', () => {
    do_not_optimize(lodash.forEach(string, x => x.toUpperCase()));
  });
});

group('forEach/object', () => {
  const string = Object.fromEntries([1, 2, 3, 4, 5, 6].map(value => [value, value]));

  bench('es-toolkit/compat/forEach', () => {
    do_not_optimize(forEachToolkit(string, x => x + 3));
  });

  bench('lodash/forEach', () => {
    do_not_optimize(lodash.forEach(string, x => x + 3));
  });
});
