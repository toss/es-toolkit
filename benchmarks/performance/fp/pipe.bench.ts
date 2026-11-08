import {
  chunk as chunkToolkit,
  filter as filterToolkit,
  map as mapToolkit,
  pipe as pipeToolkit,
  take as takeToolkit,
  uniq as uniqToolkit,
} from 'es-toolkit/fp';
import lodashFp from 'lodash/fp.js';
import {
  chunk as chunkRemeda,
  filter as filterRemeda,
  map as mapRemeda,
  pipe as pipeRemeda,
  take as takeRemeda,
  unique as uniqueRemeda,
} from 'remeda';
import { bench, group } from '../harness.ts';

const array = Array.from({ length: 10000 }, (_, i) => i);
const duplicated = Array.from({ length: 10000 }, (_, i) => i % 1000);

group('pipe/map', () => {
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
    lodashFp.pipe(lodashFp.map((x: number) => x * 2))(array);
  });
});

group('pipe/filter + map', () => {
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
    lodashFp.pipe(
      lodashFp.filter((x: number) => x % 2 === 0),
      lodashFp.map((x: number) => x + 1)
    )(array);
  });
});

group('pipe/map + filter + take(5) (lazy short-circuit)', () => {
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
    lodashFp.pipe(
      lodashFp.map((x: number) => x * 2),
      lodashFp.filter((x: number) => x % 3 === 0),
      lodashFp.take(5)
    )(array);
  });
});

group('pipe/uniq', () => {
  bench('es-toolkit/fp', () => {
    pipeToolkit(duplicated, uniqToolkit());
  });

  bench('remeda', () => {
    pipeRemeda(duplicated, uniqueRemeda());
  });

  bench('lodash/fp', () => {
    lodashFp.pipe(lodashFp.uniq)(duplicated);
  });
});

group('pipe/chunk(10)', () => {
  bench('es-toolkit/fp', () => {
    pipeToolkit(array, chunkToolkit(10));
  });

  bench('remeda', () => {
    pipeRemeda(array, chunkRemeda(10));
  });

  bench('lodash/fp', () => {
    lodashFp.pipe(lodashFp.chunk(10))(array);
  });
});
