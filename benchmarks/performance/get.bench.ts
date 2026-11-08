import { get as getToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('get with simple string', () => {
  bench('es-toolkit/get', () => {
    do_not_optimize(getToolkit({ a: 1, b: 2 }, 'a'));
  });

  bench('lodash/get', () => {
    do_not_optimize(lodash.get({ a: 1, b: 2 }, 'a'));
  });
});

group('get with string', () => {
  bench('es-toolkit/get', () => {
    do_not_optimize(getToolkit({ a: { b: 3 } }, 'a.b'));
  });

  bench('lodash/get', () => {
    do_not_optimize(lodash.get({ a: { b: 3 } }, 'a.b'));
  });
});

group('get with string array', () => {
  bench('es-toolkit/get', () => {
    do_not_optimize(getToolkit({ a: { b: 3 } }, ['a', 'b']));
  });

  bench('lodash/get', () => {
    do_not_optimize(lodash.get({ a: { b: 3 } }, ['a', 'b']));
  });
});
