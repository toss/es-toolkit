import { bench, describe } from 'vitest';
import { result as resultToolkit_ } from 'es-toolkit/compat';
import { result as resultLodash_ } from 'lodash';

const resultToolkit = resultToolkit_;
const resultLodash = resultLodash_;

describe('result', () => {
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
    resultLodash(object, 'a');
    resultLodash(object, 'b');
    resultLodash(object, 'c.d.e');
    resultLodash(object, 'f');
    resultLodash(object, 'arr[2]');
    resultLodash(object, 'nonexistent', 'default');
    resultLodash(null, 'a', 'default');
  });
});

describe('result/largeObject', () => {
  const largeObject = Object.fromEntries(
    Array.from({ length: 1000 }, (_, i) => [`key${i}`, i % 2 === 0 ? () => i : { nested: { value: i } }])
  );

  bench('es-toolkit/result', () => {
    resultToolkit(largeObject, 'key500');
    resultToolkit(largeObject, 'key501.nested.value');
    resultToolkit(largeObject, 'key999.nested.value', 'default');
  });

  bench('lodash/result', () => {
    resultLodash(largeObject, 'key500');
    resultLodash(largeObject, 'key501.nested.value');
    resultLodash(largeObject, 'key999.nested.value', 'default');
  });
});
