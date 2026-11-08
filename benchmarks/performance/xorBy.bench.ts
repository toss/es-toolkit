import { xorBy as xorByToolkit } from 'es-toolkit';
import { xorBy as xorByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('xorBy', () => {
  bench('es-toolkit/xorBy', () => {
    const idMapper = (obj: { id: number }) => obj.id;
    do_not_optimize(xorByToolkit([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper));
  });

  bench('es-toolkit/compat/xorBy', () => {
    const idMapper = (obj: { id: number }) => obj.id;
    do_not_optimize(xorByToolkitCompat([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper));
  });

  bench('lodash/xorBy', () => {
    const idMapper = (obj: { id: number }) => obj.id;
    do_not_optimize(lodash.xorBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper));
  });
});

group('xorBy/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));

  bench('es-toolkit/xorBy', () => {
    const idMapper = (obj: { id: number }) => obj.id;
    do_not_optimize(xorByToolkit(largeArray1, largeArray2, idMapper));
  });

  bench('es-toolkit/compat/xorBy', () => {
    const idMapper = (obj: { id: number }) => obj.id;
    do_not_optimize(xorByToolkitCompat(largeArray1, largeArray2, idMapper));
  });

  bench('lodash/xorBy', () => {
    const idMapper = (obj: { id: number }) => obj.id;
    do_not_optimize(lodash.xorBy(largeArray1, largeArray2, idMapper));
  });
});
