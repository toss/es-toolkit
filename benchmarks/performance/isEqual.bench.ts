import { isEqual as isEqualToolkit } from 'es-toolkit';
import { isEqual as isEqualToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isEqual primitives', () => {
  bench('es-toolkit/isEqual', () => {
    do_not_optimize(isEqualToolkit(1, 1));
    do_not_optimize(isEqualToolkit(NaN, NaN));
    do_not_optimize(isEqualToolkit(+0, -0));

    do_not_optimize(isEqualToolkit(true, true));
    do_not_optimize(isEqualToolkit(true, false));

    do_not_optimize(isEqualToolkit('hello', 'hello'));
    do_not_optimize(isEqualToolkit('hello', 'world'));
  });

  bench('es-toolkit/compat/isEqual', () => {
    do_not_optimize(isEqualToolkitCompat(1, 1));
    do_not_optimize(isEqualToolkitCompat(NaN, NaN));
    do_not_optimize(isEqualToolkitCompat(+0, -0));

    do_not_optimize(isEqualToolkitCompat(true, true));
    do_not_optimize(isEqualToolkitCompat(true, false));

    do_not_optimize(isEqualToolkitCompat('hello', 'hello'));
    do_not_optimize(isEqualToolkitCompat('hello', 'world'));
  });

  bench('lodash/isEqual', () => {
    do_not_optimize(lodash.isEqual(1, 1));
    do_not_optimize(lodash.isEqual(NaN, NaN));
    do_not_optimize(lodash.isEqual(+0, -0));

    do_not_optimize(lodash.isEqual(true, true));
    do_not_optimize(lodash.isEqual(true, false));

    do_not_optimize(lodash.isEqual('hello', 'hello'));
    do_not_optimize(lodash.isEqual('hello', 'world'));
  });
});

group('isEqual dates', () => {
  bench('es-toolkit/isEqual', () => {
    do_not_optimize(isEqualToolkit(new Date('2020-01-01'), new Date('2020-01-01')));
    do_not_optimize(isEqualToolkit(new Date('2020-01-01'), new Date('2021-01-01')));
  });

  bench('es-toolkit/compat/isEqual', () => {
    do_not_optimize(isEqualToolkitCompat(new Date('2020-01-01'), new Date('2020-01-01')));
    do_not_optimize(isEqualToolkitCompat(new Date('2020-01-01'), new Date('2021-01-01')));
  });

  bench('lodash', () => {
    do_not_optimize(lodash.isEqual(new Date('2020-01-01'), new Date('2020-01-01')));
    do_not_optimize(lodash.isEqual(new Date('2020-01-01'), new Date('2021-01-01')));
  });
});

group('isEqual RegExps', () => {
  bench('es-toolkit/isEqual', () => {
    do_not_optimize(isEqualToolkit(/hello/g, /hello/g));
    do_not_optimize(isEqualToolkit(/hello/g, /hello/i));
  });

  bench('es-toolkit/compat/isEqual', () => {
    do_not_optimize(isEqualToolkitCompat(/hello/g, /hello/g));
    do_not_optimize(isEqualToolkitCompat(/hello/g, /hello/i));
  });

  bench('lodash', () => {
    do_not_optimize(lodash.isEqual(/hello/g, /hello/g));
    do_not_optimize(lodash.isEqual(/hello/g, /hello/i));
  });
});

group('isEqual objects', () => {
  bench('es-toolkit/isEqual', () => {
    do_not_optimize(isEqualToolkit({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }));
    do_not_optimize(isEqualToolkit({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }));
    do_not_optimize(isEqualToolkit({ a: 1, b: 2 }, { a: 1, b: 2 }));
  });

  bench('es-toolkit/compat/isEqual', () => {
    do_not_optimize(isEqualToolkitCompat({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }));
    do_not_optimize(isEqualToolkitCompat({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }));
    do_not_optimize(isEqualToolkitCompat({ a: 1, b: 2 }, { a: 1, b: 2 }));
  });

  bench('lodash', () => {
    do_not_optimize(lodash.isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }));
    do_not_optimize(lodash.isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }));
    do_not_optimize(lodash.isEqual({ a: 1, b: 2 }, { a: 1, b: 2 }));
  });
});

group('isEqual arrays', () => {
  bench('es-toolkit/isEqual', () => {
    do_not_optimize(isEqualToolkit([1, 2, 3], [1, 2, 3]));
    do_not_optimize(isEqualToolkit([1, 2, 3], [1, 2, 4]));
  });

  bench('es-toolkit/compat/isEqual', () => {
    do_not_optimize(isEqualToolkitCompat([1, 2, 3], [1, 2, 3]));
    do_not_optimize(isEqualToolkitCompat([1, 2, 3], [1, 2, 4]));
  });

  bench('lodash', () => {
    do_not_optimize(lodash.isEqual([1, 2, 3], [1, 2, 3]));
    do_not_optimize(lodash.isEqual([1, 2, 3], [1, 2, 4]));
  });
});
