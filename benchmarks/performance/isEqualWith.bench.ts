import { isEqualWith as isEqualWithToolkit } from 'es-toolkit';
import { isEqualWith as isEqualWithToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isEqualWith primitives', () => {
  const customizer = (a: unknown, b: unknown) => {
    if (typeof a === 'string' && typeof b === 'string') {
      return a.toLowerCase() === b.toLowerCase();
    }
  };

  bench('es-toolkit/isEqualWith', () => {
    do_not_optimize(isEqualWithToolkit(1, 1, customizer));
    do_not_optimize(isEqualWithToolkit(NaN, NaN, customizer));
    do_not_optimize(isEqualWithToolkit(+0, -0, customizer));

    do_not_optimize(isEqualWithToolkit(true, true, customizer));
    do_not_optimize(isEqualWithToolkit(true, false, customizer));

    do_not_optimize(isEqualWithToolkit('hello', 'hello', customizer));
    do_not_optimize(isEqualWithToolkit('hello', 'world', customizer));
  });

  bench('es-toolkit/compat/isEqualWith', () => {
    do_not_optimize(isEqualWithToolkitCompat(1, 1, customizer));
    do_not_optimize(isEqualWithToolkitCompat(NaN, NaN, customizer));
    do_not_optimize(isEqualWithToolkitCompat(+0, -0, customizer));

    do_not_optimize(isEqualWithToolkitCompat(true, true, customizer));
    do_not_optimize(isEqualWithToolkitCompat(true, false, customizer));

    do_not_optimize(isEqualWithToolkitCompat('hello', 'hello', customizer));
    do_not_optimize(isEqualWithToolkitCompat('hello', 'world', customizer));
  });

  bench('lodash/isEqualWith', () => {
    do_not_optimize(lodash.isEqualWith(1, 1, customizer));
    do_not_optimize(lodash.isEqualWith(NaN, NaN, customizer));
    do_not_optimize(lodash.isEqualWith(+0, -0, customizer));

    do_not_optimize(lodash.isEqualWith(true, true, customizer));
    do_not_optimize(lodash.isEqualWith(true, false, customizer));

    do_not_optimize(lodash.isEqualWith('hello', 'hello', customizer));
    do_not_optimize(lodash.isEqualWith('hello', 'world', customizer));
  });
});

group('isEqualWith dates', () => {
  const customizer = (a: unknown, b: unknown) => {
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }
  };
  bench('es-toolkit/isEqualWith', () => {
    do_not_optimize(isEqualWithToolkit(new Date('2020-01-01'), new Date('2020-01-01'), customizer));
    do_not_optimize(isEqualWithToolkit(new Date('2020-01-01'), new Date('2021-01-01'), customizer));
  });

  bench('es-toolkit/compat/isEqualWith', () => {
    do_not_optimize(isEqualWithToolkitCompat(new Date('2020-01-01'), new Date('2020-01-01'), customizer));
    do_not_optimize(isEqualWithToolkitCompat(new Date('2020-01-01'), new Date('2021-01-01'), customizer));
  });

  bench('lodash', () => {
    do_not_optimize(lodash.isEqualWith(new Date('2020-01-01'), new Date('2020-01-01'), customizer));
    do_not_optimize(lodash.isEqualWith(new Date('2020-01-01'), new Date('2021-01-01'), customizer));
  });
});

group('isEqualWith RegExps', () => {
  const customizer = (a: unknown, b: unknown) => {
    if (a instanceof RegExp && b instanceof RegExp) {
      return a.source === b.source;
    }
  };
  bench('es-toolkit/isEqualWith', () => {
    do_not_optimize(isEqualWithToolkit(/hello/g, /hello/g, customizer));
    do_not_optimize(isEqualWithToolkit(/hello/g, /hello/i, customizer));
  });

  bench('es-toolkit/compat/isEqualWith', () => {
    do_not_optimize(isEqualWithToolkitCompat(/hello/g, /hello/g, customizer));
    do_not_optimize(isEqualWithToolkitCompat(/hello/g, /hello/i, customizer));
  });

  bench('lodash', () => {
    do_not_optimize(lodash.isEqualWith(/hello/g, /hello/g, customizer));
    do_not_optimize(lodash.isEqualWith(/hello/g, /hello/i, customizer));
  });
});

group('isEqualWith objects', () => {
  const customizer = (a: unknown, b: unknown) => {
    if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
      return Object.keys(a).length === Object.keys(b).length;
    }
  };
  bench('es-toolkit/isEqualWith', () => {
    do_not_optimize(isEqualWithToolkit({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }, customizer));
    do_not_optimize(isEqualWithToolkit({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }, customizer));
    do_not_optimize(isEqualWithToolkit({ a: 1, b: 2 }, { a: 1, b: 2 }, customizer));
  });

  bench('es-toolkit/compat/isEqualWith', () => {
    do_not_optimize(isEqualWithToolkitCompat({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }, customizer));
    do_not_optimize(isEqualWithToolkitCompat({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }, customizer));
    do_not_optimize(isEqualWithToolkitCompat({ a: 1, b: 2 }, { a: 1, b: 2 }, customizer));
  });

  bench('lodash', () => {
    do_not_optimize(lodash.isEqualWith({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }, customizer));
    do_not_optimize(lodash.isEqualWith({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }, customizer));
    do_not_optimize(lodash.isEqualWith({ a: 1, b: 2 }, { a: 1, b: 2 }, customizer));
  });
});

group('isEqualWith arrays', () => {
  const customizer = (a: unknown, b: unknown) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.length === b.length;
    }
  };
  bench('es-toolkit/isEqualWith', () => {
    do_not_optimize(isEqualWithToolkit([1, 2, 3], [1, 2, 3], customizer));
    do_not_optimize(isEqualWithToolkit([1, 2, 3], [1, 2, 4], customizer));
  });

  bench('es-toolkit/compat/isEqualWith', () => {
    do_not_optimize(isEqualWithToolkitCompat([1, 2, 3], [1, 2, 3], customizer));
    do_not_optimize(isEqualWithToolkitCompat([1, 2, 3], [1, 2, 4], customizer));
  });

  bench('lodash', () => {
    do_not_optimize(lodash.isEqualWith([1, 2, 3], [1, 2, 3], customizer));
    do_not_optimize(lodash.isEqualWith([1, 2, 3], [1, 2, 4], customizer));
  });
});
