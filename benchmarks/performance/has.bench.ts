import { has as hasToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('has with string', () => {
  bench('es-toolkit/has', () => {
    do_not_optimize(hasToolkit({ a: { b: 3 } }, 'a.b'));
  });

  bench('lodash/has', () => {
    do_not_optimize(lodash.has({ a: { b: 3 } }, 'a.b'));
  });
});

group('has with string array', () => {
  bench('es-toolkit/has', () => {
    do_not_optimize(hasToolkit({ a: { b: 3 } }, ['a', 'b']));
  });

  bench('lodash/has', () => {
    do_not_optimize(lodash.has({ a: { b: 3 } }, ['a', 'b']));
  });
});
