import { bench, describe } from 'vitest';
import {
  chunk as chunkToolkit,
  filter as filterToolkit,
  map as mapToolkit,
  pipe as pipeToolkit,
  sortBy as sortByToolkit,
  take as takeToolkit,
  uniq as uniqToolkit,
} from 'es-toolkit/fp';
import {
  chunk as chunkRemeda,
  filter as filterRemeda,
  map as mapRemeda,
  pipe as pipeRemeda,
  sortBy as sortByRemeda,
  take as takeRemeda,
  unique as uniqueRemeda,
} from 'remeda';

const array = Array.from({ length: 10000 }, (_, i) => i);
const duplicated = Array.from({ length: 10000 }, (_, i) => i % 1000);
const objects = array.map(value => ({ value: (value * 7919) % 10000 }));

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
});

describe('pipe/uniq', () => {
  bench('es-toolkit/fp', () => {
    pipeToolkit(duplicated, uniqToolkit());
  });

  bench('remeda', () => {
    pipeRemeda(duplicated, uniqueRemeda());
  });
});

describe('pipe/chunk(10)', () => {
  bench('es-toolkit/fp', () => {
    pipeToolkit(array, chunkToolkit(10));
  });

  bench('remeda', () => {
    pipeRemeda(array, chunkRemeda(10));
  });
});

describe('pipe/sortBy', () => {
  bench('es-toolkit/fp', () => {
    pipeToolkit(objects, sortByToolkit([item => item.value]));
  });

  bench('remeda', () => {
    pipeRemeda(
      objects,
      sortByRemeda(item => item.value)
    );
  });
});
