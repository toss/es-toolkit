import { bench, describe } from 'vitest';
import {
  chunk as chunkToolkit,
  filter as filterToolkit,
  map as mapToolkit,
  pipe as pipeToolkit,
  take as takeToolkit,
  uniq as uniqToolkit,
} from 'es-toolkit/fp';
import lodashFp from 'lodash/fp';
import {
  chunk as chunkRemeda,
  filter as filterRemeda,
  map as mapRemeda,
  pipe as pipeRemeda,
  take as takeRemeda,
  unique as uniqueRemeda,
} from 'remeda';

const array = Array.from({ length: 10000 }, (_, i) => i);
const duplicated = Array.from({ length: 10000 }, (_, i) => i % 1000);
const {
  chunk: chunkLodash,
  filter: filterLodash,
  map: mapLodash,
  pipe: pipeLodash,
  take: takeLodash,
  uniq: uniqLodash,
} = lodashFp;

describe('pipe/map', () => {
  bench('es-toolkit/fp', () => {
    pipeToolkit(
      array,
      mapToolkit(x => x * 2)
    );
  });

  bench('remeda', () => {
    pipeRemeda(
      array,
      mapRemeda(x => x * 2)
    );
  });

  bench('lodash/fp', () => {
    pipeLodash(mapLodash((x: number) => x * 2))(array);
  });
});

describe('pipe/filter + map', () => {
  bench('es-toolkit/fp', () => {
    pipeToolkit(
      array,
      filterToolkit(x => x % 2 === 0),
      mapToolkit(x => x + 1)
    );
  });

  bench('remeda', () => {
    pipeRemeda(
      array,
      filterRemeda(x => x % 2 === 0),
      mapRemeda(x => x + 1)
    );
  });

  bench('lodash/fp', () => {
    pipeLodash(
      filterLodash((x: number) => x % 2 === 0),
      mapLodash((x: number) => x + 1)
    )(array);
  });
});

describe('pipe/map + filter + take(5) (lazy short-circuit)', () => {
  bench('es-toolkit/fp', () => {
    pipeToolkit(
      array,
      mapToolkit(x => x * 2),
      filterToolkit(x => x % 3 === 0),
      takeToolkit(5)
    );
  });

  bench('remeda', () => {
    pipeRemeda(
      array,
      mapRemeda(x => x * 2),
      filterRemeda(x => x % 3 === 0),
      takeRemeda(5)
    );
  });

  bench('lodash/fp', () => {
    pipeLodash(
      mapLodash((x: number) => x * 2),
      filterLodash((x: number) => x % 3 === 0),
      takeLodash(5)
    )(array);
  });
});

describe('pipe/uniq', () => {
  bench('es-toolkit/fp', () => {
    pipeToolkit(duplicated, uniqToolkit());
  });

  bench('remeda', () => {
    pipeRemeda(duplicated, uniqueRemeda());
  });

  bench('lodash/fp', () => {
    pipeLodash(uniqLodash)(duplicated);
  });
});

describe('pipe/chunk(10)', () => {
  bench('es-toolkit/fp', () => {
    pipeToolkit(array, chunkToolkit(10));
  });

  bench('remeda', () => {
    pipeRemeda(array, chunkRemeda(10));
  });

  bench('lodash/fp', () => {
    pipeLodash(chunkLodash(10))(array);
  });
});
