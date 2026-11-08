import { functions as functionsToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('functions', () => {
  const testObject = {
    a: 'a',
    b: () => 'b',
    c: /x/,
    d: function () {},
    e: 123,
  };

  bench('es-toolkit/functions', () => {
    do_not_optimize(functionsToolkit(testObject));
  });

  bench('lodash/functions', () => {
    do_not_optimize(lodash.functions(testObject));
  });
});

group('functions/largeObject', () => {
  const largeObject = Object.fromEntries(
    Array.from({ length: 1000 }, (_, i) => [`key${i}`, i % 2 === 0 ? () => i : i])
  );

  bench('es-toolkit/functions', () => {
    do_not_optimize(functionsToolkit(largeObject));
  });

  bench('lodash/functions', () => {
    do_not_optimize(lodash.functions(largeObject));
  });
});
