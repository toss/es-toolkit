import { isEqualWith as isEqualWithToolkit } from 'es-toolkit';
import { isEqualWith as isEqualWithToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isEqualWith primitives', () => {
  const customizer = (a: unknown, b: unknown) => {
    if (typeof a === 'string' && typeof b === 'string') {
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
    lodash.isEqualWith(1, 1, customizer);
    lodash.isEqualWith(NaN, NaN, customizer);
    lodash.isEqualWith(+0, -0, customizer);

    lodash.isEqualWith(true, true, customizer);
    lodash.isEqualWith(true, false, customizer);

    lodash.isEqualWith('hello', 'hello', customizer);
    lodash.isEqualWith('hello', 'world', customizer);
  });
});

group('isEqualWith dates', () => {
  const customizer = (a: unknown, b: unknown) => {
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
    lodash.isEqualWith(new Date('2020-01-01'), new Date('2020-01-01'), customizer);
    lodash.isEqualWith(new Date('2020-01-01'), new Date('2021-01-01'), customizer);
  });
});

group('isEqualWith RegExps', () => {
  const customizer = (a: unknown, b: unknown) => {
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
    lodash.isEqualWith(/hello/g, /hello/g, customizer);
    lodash.isEqualWith(/hello/g, /hello/i, customizer);
  });
});

group('isEqualWith objects', () => {
  const customizer = (a: unknown, b: unknown) => {
    if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
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
    lodash.isEqualWith({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }, customizer);
    lodash.isEqualWith({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }, customizer);
    lodash.isEqualWith({ a: 1, b: 2 }, { a: 1, b: 2 }, customizer);
  });
});

group('isEqualWith arrays', () => {
  const customizer = (a: unknown, b: unknown) => {
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
    lodash.isEqualWith([1, 2, 3], [1, 2, 3], customizer);
    lodash.isEqualWith([1, 2, 3], [1, 2, 4], customizer);
  });
});
