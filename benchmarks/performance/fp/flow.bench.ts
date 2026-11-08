import { filter as filterToolkit, flow as flowToolkit, map as mapToolkit, take as takeToolkit } from 'es-toolkit/fp';
import lodashFp from 'lodash/fp.js';
import { bench, group } from '../harness.ts';

const array = Array.from({ length: 10000 }, (_, i) => i);

group('flow/scalar composition', () => {
  const add = (x: number, y: number) => x + y;
  const square = (n: number) => n * n;

  bench('es-toolkit/fp', () => {
    const combined = flowToolkit(add, square);
    combined(1, 2);
  });

  bench('lodash/fp', () => {
    const combined = lodashFp.flow(add, square);
    combined(1, 2);
  });
});

group('flow/map', () => {
  bench('es-toolkit/fp', () => {
    const combined = flowToolkit(mapToolkit((x: number) => x * 2));
    combined(array);
  });

  bench('lodash/fp', () => {
    const combined = lodashFp.flow(lodashFp.map((x: number) => x * 2));
    combined(array);
  });
});

group('flow/map + filter + take(5) (lazy short-circuit)', () => {
  bench('es-toolkit/fp', () => {
    const combined = flowToolkit(
      mapToolkit((x: number) => x * 2),
      filterToolkit(x => x % 3 === 0),
      takeToolkit(5)
    );
    combined(array);
  });

  bench('lodash/fp', () => {
    const combined = lodashFp.flow(
      lodashFp.map((x: number) => x * 2),
      lodashFp.filter((x: number) => x % 3 === 0),
      lodashFp.take(5)
    );
    combined(array);
  });
});
