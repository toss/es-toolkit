import { bench, describe } from 'vitest';
import { pull as pullToolkit } from 'es-toolkit/compat';
import { pull as pullLodash } from 'lodash';

describe('pull array size 100', () => {
  const array = [...Array(100)].map((_, i) => i);
  const even = [...Array(50)].map((_, i) => i * 2);

  bench('es-toolkit/pull', () => {
    pullToolkit([...array], even);
  });

  bench('lodash/pull', () => {
    pullLodash([...array], ...even);
  });
});

describe('pull array size 1000', () => {
  const array = [...Array(1000)].map((_, i) => i);
  const even = [...Array(500)].map((_, i) => i * 2);

  bench('es-toolkit/pull', () => {
    pullToolkit([...array], [...even]);
  });

  bench('lodash/pull', () => {
    pullLodash([...array], ...even);
  });
});

describe('pull array size 10000', () => {
  const array = [...Array(10000)].map((_, i) => i);
  const even = [...Array(5000)].map((_, i) => i * 2);

  bench('es-toolkit/pull', () => {
    pullToolkit([...array], [...even]);
  });

  bench('lodash/pull', () => {
    pullLodash([...array], ...even);
  });
});
