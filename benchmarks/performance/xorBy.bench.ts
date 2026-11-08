import { xorBy as xorByToolkit } from 'es-toolkit';
import { xorBy as xorByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('xorBy', () => {
  bench('es-toolkit/xorBy', () => {
    const idMapper = (obj: { id: number }) => obj.id;
    xorByToolkit([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
  });

  bench('es-toolkit/compat/xorBy', () => {
    const idMapper = (obj: { id: number }) => obj.id;
    xorByToolkitCompat([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
  });

  bench('lodash/xorBy', () => {
    const idMapper = (obj: { id: number }) => obj.id;
    lodash.xorBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
  });
});

group('xorBy/largeArray', () => {
  const largeArray1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const largeArray2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));

  bench('es-toolkit/xorBy', () => {
    const idMapper = (obj: { id: number }) => obj.id;
    xorByToolkit(largeArray1, largeArray2, idMapper);
  });

  bench('es-toolkit/compat/xorBy', () => {
    const idMapper = (obj: { id: number }) => obj.id;
    xorByToolkitCompat(largeArray1, largeArray2, idMapper);
  });

  bench('lodash/xorBy', () => {
    const idMapper = (obj: { id: number }) => obj.id;
    lodash.xorBy(largeArray1, largeArray2, idMapper);
  });
});
