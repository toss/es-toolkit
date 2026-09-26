import { bench, describe } from 'vitest';
import { serialize as serializeToolkit } from 'es-toolkit/util';
import { serialize as serializeOhash } from 'ohash';

const smallObject = { id: 1, name: 'Alice', active: true };

const mediumObject: Record<string, unknown> = {};
for (let i = 0; i < 100; i++) {
  mediumObject[`key${i}`] = { index: i, label: `value-${i}`, nested: { flag: i % 2 === 0 } };
}

const largeArray = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `item-${i}`,
  tags: [`tag-${i % 10}`, `tag-${i % 7}`],
  meta: { createdAt: i * 1000, priority: i % 5 },
}));

describe('serialize: small object', () => {
  bench('es-toolkit/serialize', () => {
    serializeToolkit(smallObject);
  });

  bench('ohash/serialize', () => {
    serializeOhash(smallObject);
  });
});

describe('serialize: medium object (100 keys)', () => {
  bench('es-toolkit/serialize', () => {
    serializeToolkit(mediumObject);
  });

  bench('ohash/serialize', () => {
    serializeOhash(mediumObject);
  });
});

describe('serialize: large array (1,000 objects)', () => {
  bench('es-toolkit/serialize', () => {
    serializeToolkit(largeArray);
  });

  bench('ohash/serialize', () => {
    serializeOhash(largeArray);
  });
});
