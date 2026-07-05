import { bench, describe } from 'vitest';
import { filter as filterToolkit, flow as flowToolkit, map as mapToolkit, take as takeToolkit } from 'es-toolkit/fp';
import lodashFp from 'lodash/fp';

const array = Array.from({ length: 10000 }, (_, i) => i);
const { filter: filterLodash, flow: flowLodash, map: mapLodash, take: takeLodash } = lodashFp;

describe('flow/scalar composition', () => {
  const add = (x: number, y: number) => x + y;
  const square = (n: number) => n * n;

  bench('es-toolkit/fp', () => {
    const combined = flowToolkit(add, square);
    combined(1, 2);
  });

  bench('lodash/fp', () => {
    const combined = flowLodash(add, square);
    combined(1, 2);
  });
});

describe('flow/map', () => {
  bench('es-toolkit/fp', () => {
    const combined = flowToolkit(mapToolkit((x: number) => x * 2));
    combined(array);
  });

  bench('lodash/fp', () => {
    const combined = flowLodash(mapLodash((x: number) => x * 2));
    combined(array);
  });
});

describe('flow/map + filter + take(5) (lazy short-circuit)', () => {
  bench('es-toolkit/fp', () => {
    const combined = flowToolkit(
      mapToolkit((x: number) => x * 2),
      filterToolkit(x => x % 3 === 0),
      takeToolkit(5)
    );
    combined(array);
  });

  bench('lodash/fp', () => {
    const combined = flowLodash(
      mapLodash((x: number) => x * 2),
      filterLodash((x: number) => x % 3 === 0),
      takeLodash(5)
    );
    combined(array);
  });
});
