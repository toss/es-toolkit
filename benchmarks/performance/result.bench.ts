import { result as resultToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

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
    resultToolkit(object, 'a');
    resultToolkit(object, 'b');
    resultToolkit(object, 'c.d.e');
    resultToolkit(object, 'f');
    resultToolkit(object, 'arr[2]');
    resultToolkit(object, 'nonexistent', 'default');
    resultToolkit(null, 'a', 'default');
  });

  bench('lodash/result', () => {
    lodash.result(object, 'a');
    lodash.result(object, 'b');
    lodash.result(object, 'c.d.e');
    lodash.result(object, 'f');
    lodash.result(object, 'arr[2]');
    lodash.result(object, 'nonexistent', 'default');
    lodash.result(null, 'a', 'default');
  });
});

group('result/largeObject', () => {
  const largeObject = Object.fromEntries(
    Array.from({ length: 1000 }, (_, i) => [`key${i}`, i % 2 === 0 ? () => i : { nested: { value: i } }])
  );

  bench('es-toolkit/result', () => {
    resultToolkit(largeObject, 'key500');
    resultToolkit(largeObject, 'key501.nested.value');
    resultToolkit(largeObject, 'key999.nested.value', 'default');
  });

  bench('lodash/result', () => {
    lodash.result(largeObject, 'key500');
    lodash.result(largeObject, 'key501.nested.value');
    lodash.result(largeObject, 'key999.nested.value', 'default');
  });
});
