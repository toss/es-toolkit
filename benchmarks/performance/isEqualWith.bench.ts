import { bench, describe } from 'vitest';
import { isString } from 'es-toolkit';
import { isEqualWith as isEqualWithToolkit_ } from 'es-toolkit';
import { isEqualWith as isEqualWithToolkitCompat_ } from 'es-toolkit/compat';
import { isEqualWith as isEqualWithLodash_ } from 'lodash';

const isEqualWithToolkit = isEqualWithToolkit_;
const isEqualWithToolkitCompat = isEqualWithToolkitCompat_;
const isEqualWithLodash = isEqualWithLodash_;

describe('isEqualWith primitives', () => {
  const customizer = (a, b) => {
    if (isString(a) && isString(b)) {
      return a.toLowerCase() === b.toLowerCase();
    }
  };

  bench('es-toolkit/isEqualWith', () => {
    isEqualWithToolkit(1, 1, customizer);
    isEqualWithToolkit(NaN, NaN, customizer);
    isEqualWithToolkit(+0, -0, customizer);

    isEqualWithToolkit(true, true, customizer);
    isEqualWithToolkit(true, false, customizer);

    isEqualWithToolkit('hello', 'hello', customizer);
    isEqualWithToolkit('hello', 'world', customizer);
  });

  bench('es-toolkit/compat/isEqualWith', () => {
    isEqualWithToolkitCompat(1, 1, customizer);
    isEqualWithToolkitCompat(NaN, NaN, customizer);
    isEqualWithToolkitCompat(+0, -0, customizer);

    isEqualWithToolkitCompat(true, true, customizer);
    isEqualWithToolkitCompat(true, false, customizer);

    isEqualWithToolkitCompat('hello', 'hello', customizer);
    isEqualWithToolkitCompat('hello', 'world', customizer);
  });

  bench('lodash/isEqualWith', () => {
    isEqualWithLodash(1, 1, customizer);
    isEqualWithLodash(NaN, NaN, customizer);
    isEqualWithLodash(+0, -0, customizer);

    isEqualWithLodash(true, true, customizer);
    isEqualWithLodash(true, false, customizer);

    isEqualWithLodash('hello', 'hello', customizer);
    isEqualWithLodash('hello', 'world', customizer);
  });
});

describe('isEqualWith dates', () => {
  const customizer = (a, b) => {
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }
  };
  bench('es-toolkit/isEqualWith', () => {
    isEqualWithToolkit(new Date('2020-01-01'), new Date('2020-01-01'), customizer);
    isEqualWithToolkit(new Date('2020-01-01'), new Date('2021-01-01'), customizer);
  });

  bench('es-toolkit/compat/isEqualWith', () => {
    isEqualWithToolkitCompat(new Date('2020-01-01'), new Date('2020-01-01'), customizer);
    isEqualWithToolkitCompat(new Date('2020-01-01'), new Date('2021-01-01'), customizer);
  });

  bench('lodash', () => {
    isEqualWithLodash(new Date('2020-01-01'), new Date('2020-01-01'), customizer);
    isEqualWithLodash(new Date('2020-01-01'), new Date('2021-01-01'), customizer);
  });
});

describe('isEqualWith RegExps', () => {
  const customizer = (a, b) => {
    if (a instanceof RegExp && b instanceof RegExp) {
      return a.source === b.source;
    }
  };
  bench('es-toolkit/isEqualWith', () => {
    isEqualWithToolkit(/hello/g, /hello/g, customizer);
    isEqualWithToolkit(/hello/g, /hello/i, customizer);
  });

  bench('es-toolkit/compat/isEqualWith', () => {
    isEqualWithToolkitCompat(/hello/g, /hello/g, customizer);
    isEqualWithToolkitCompat(/hello/g, /hello/i, customizer);
  });

  bench('lodash', () => {
    isEqualWithLodash(/hello/g, /hello/g, customizer);
    isEqualWithLodash(/hello/g, /hello/i, customizer);
  });
});

describe('isEqualWith objects', () => {
  const customizer = (a, b) => {
    if (typeof a === 'object' && typeof b === 'object') {
      return Object.keys(a).length === Object.keys(b).length;
    }
  };
  bench('es-toolkit/isEqualWith', () => {
    isEqualWithToolkit({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }, customizer);
    isEqualWithToolkit({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }, customizer);
    isEqualWithToolkit({ a: 1, b: 2 }, { a: 1, b: 2 }, customizer);
  });

  bench('es-toolkit/compat/isEqualWith', () => {
    isEqualWithToolkitCompat({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }, customizer);
    isEqualWithToolkitCompat({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }, customizer);
    isEqualWithToolkitCompat({ a: 1, b: 2 }, { a: 1, b: 2 }, customizer);
  });

  bench('lodash', () => {
    isEqualWithLodash({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }, customizer);
    isEqualWithLodash({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }, customizer);
    isEqualWithLodash({ a: 1, b: 2 }, { a: 1, b: 2 }, customizer);
  });
});

describe('isEqualWith arrays', () => {
  const customizer = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.length === b.length;
    }
  };
  bench('es-toolkit/isEqualWith', () => {
    isEqualWithToolkit([1, 2, 3], [1, 2, 3], customizer);
    isEqualWithToolkit([1, 2, 3], [1, 2, 4], customizer);
  });

  bench('es-toolkit/compat/isEqualWith', () => {
    isEqualWithToolkitCompat([1, 2, 3], [1, 2, 3], customizer);
    isEqualWithToolkitCompat([1, 2, 3], [1, 2, 4], customizer);
  });

  bench('lodash', () => {
    isEqualWithLodash([1, 2, 3], [1, 2, 3], customizer);
    isEqualWithLodash([1, 2, 3], [1, 2, 4], customizer);
  });
});
