import { isEqual as isEqualToolkit } from 'es-toolkit';
import { isEqual as isEqualToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isEqual primitives', () => {
  bench('es-toolkit/isEqual', () => {
    isEqualToolkit(1, 1);
    isEqualToolkit(NaN, NaN);
    isEqualToolkit(+0, -0);

    isEqualToolkit(true, true);
    isEqualToolkit(true, false);

    isEqualToolkit('hello', 'hello');
    isEqualToolkit('hello', 'world');
  });

  bench('es-toolkit/compat/isEqual', () => {
    isEqualToolkitCompat(1, 1);
    isEqualToolkitCompat(NaN, NaN);
    isEqualToolkitCompat(+0, -0);

    isEqualToolkitCompat(true, true);
    isEqualToolkitCompat(true, false);

    isEqualToolkitCompat('hello', 'hello');
    isEqualToolkitCompat('hello', 'world');
  });

  bench('lodash/isEqual', () => {
    lodash.isEqual(1, 1);
    lodash.isEqual(NaN, NaN);
    lodash.isEqual(+0, -0);

    lodash.isEqual(true, true);
    lodash.isEqual(true, false);

    lodash.isEqual('hello', 'hello');
    lodash.isEqual('hello', 'world');
  });
});

group('isEqual dates', () => {
  bench('es-toolkit/isEqual', () => {
    isEqualToolkit(new Date('2020-01-01'), new Date('2020-01-01'));
    isEqualToolkit(new Date('2020-01-01'), new Date('2021-01-01'));
  });

  bench('es-toolkit/compat/isEqual', () => {
    isEqualToolkitCompat(new Date('2020-01-01'), new Date('2020-01-01'));
    isEqualToolkitCompat(new Date('2020-01-01'), new Date('2021-01-01'));
  });

  bench('lodash', () => {
    lodash.isEqual(new Date('2020-01-01'), new Date('2020-01-01'));
    lodash.isEqual(new Date('2020-01-01'), new Date('2021-01-01'));
  });
});

group('isEqual RegExps', () => {
  bench('es-toolkit/isEqual', () => {
    isEqualToolkit(/hello/g, /hello/g);
    isEqualToolkit(/hello/g, /hello/i);
  });

  bench('es-toolkit/compat/isEqual', () => {
    isEqualToolkitCompat(/hello/g, /hello/g);
    isEqualToolkitCompat(/hello/g, /hello/i);
  });

  bench('lodash', () => {
    lodash.isEqual(/hello/g, /hello/g);
    lodash.isEqual(/hello/g, /hello/i);
  });
});

group('isEqual objects', () => {
  bench('es-toolkit/isEqual', () => {
    isEqualToolkit({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } });
    isEqualToolkit({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } });
    isEqualToolkit({ a: 1, b: 2 }, { a: 1, b: 2 });
  });

  bench('es-toolkit/compat/isEqual', () => {
    isEqualToolkitCompat({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } });
    isEqualToolkitCompat({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } });
    isEqualToolkitCompat({ a: 1, b: 2 }, { a: 1, b: 2 });
  });

  bench('lodash', () => {
    lodash.isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } });
    lodash.isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } });
    lodash.isEqual({ a: 1, b: 2 }, { a: 1, b: 2 });
  });
});

group('isEqual arrays', () => {
  bench('es-toolkit/isEqual', () => {
    isEqualToolkit([1, 2, 3], [1, 2, 3]);
    isEqualToolkit([1, 2, 3], [1, 2, 4]);
  });

  bench('es-toolkit/compat/isEqual', () => {
    isEqualToolkitCompat([1, 2, 3], [1, 2, 3]);
    isEqualToolkitCompat([1, 2, 3], [1, 2, 4]);
  });

  bench('lodash', () => {
    lodash.isEqual([1, 2, 3], [1, 2, 3]);
    lodash.isEqual([1, 2, 3], [1, 2, 4]);
  });
});
