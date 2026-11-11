import { result as resultToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('result', () => {
  const object = {
    a: 1,
    b: () => 'b',
    c: { d: { e: 5 } },
    f: function () {
      return this.g;
    },
    g: 10,
    arr: [1, 2, 3],
  };

  bench('es-toolkit/result', () => {
    do_not_optimize(resultToolkit(object, 'a'));
    do_not_optimize(resultToolkit(object, 'b'));
    do_not_optimize(resultToolkit(object, 'c.d.e'));
    do_not_optimize(resultToolkit(object, 'f'));
    do_not_optimize(resultToolkit(object, 'arr[2]'));
    do_not_optimize(resultToolkit(object, 'nonexistent', 'default'));
    do_not_optimize(resultToolkit(null, 'a', 'default'));
  });

  bench('lodash/result', () => {
    do_not_optimize(lodash.result(object, 'a'));
    do_not_optimize(lodash.result(object, 'b'));
    do_not_optimize(lodash.result(object, 'c.d.e'));
    do_not_optimize(lodash.result(object, 'f'));
    do_not_optimize(lodash.result(object, 'arr[2]'));
    do_not_optimize(lodash.result(object, 'nonexistent', 'default'));
    do_not_optimize(lodash.result(null, 'a', 'default'));
  });
});

group('result/largeObject', () => {
  const largeObject = Object.fromEntries(
    Array.from({ length: 1000 }, (_, i) => [`key${i}`, i % 2 === 0 ? () => i : { nested: { value: i } }])
  );

  bench('es-toolkit/result', () => {
    do_not_optimize(resultToolkit(largeObject, 'key500'));
    do_not_optimize(resultToolkit(largeObject, 'key501.nested.value'));
    do_not_optimize(resultToolkit(largeObject, 'key999.nested.value', 'default'));
  });

  bench('lodash/result', () => {
    do_not_optimize(lodash.result(largeObject, 'key500'));
    do_not_optimize(lodash.result(largeObject, 'key501.nested.value'));
    do_not_optimize(lodash.result(largeObject, 'key999.nested.value', 'default'));
  });
});
