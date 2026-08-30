import { bench, describe } from 'vitest';
import { hash as hashToolkit } from 'es-toolkit/util/hash';
import objectHash from 'object-hash';
import { hash as hashOhash } from 'ohash';
import { hash as hashToolkitBrowser } from '../../src/util/hash/browser';

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

const longString = 'lorem ipsum dolor sit amet '.repeat(400); // ~10KB

describe('hash: small object', () => {
  bench('es-toolkit/util/hash (node)', () => {
    hashToolkit(smallObject);
  });

  bench('es-toolkit/util/hash (browser impl)', () => {
    hashToolkitBrowser(smallObject);
  });

  bench('ohash', () => {
    hashOhash(smallObject);
  });

  bench('object-hash', () => {
    objectHash(smallObject);
  });
});

describe('hash: medium object (100 keys)', () => {
  bench('es-toolkit/util/hash (node)', () => {
    hashToolkit(mediumObject);
  });

  bench('es-toolkit/util/hash (browser impl)', () => {
    hashToolkitBrowser(mediumObject);
  });

  bench('ohash', () => {
    hashOhash(mediumObject);
  });

  bench('object-hash', () => {
    objectHash(mediumObject);
  });
});

describe('hash: large array (1,000 objects)', () => {
  bench('es-toolkit/util/hash (node)', () => {
    hashToolkit(largeArray);
  });

  bench('es-toolkit/util/hash (browser impl)', () => {
    hashToolkitBrowser(largeArray);
  });

  bench('ohash', () => {
    hashOhash(largeArray);
  });

  bench('object-hash', () => {
    objectHash(largeArray);
  });
});

describe('hash: long string (~10KB)', () => {
  bench('es-toolkit/util/hash (node)', () => {
    hashToolkit(longString);
  });

  bench('es-toolkit/util/hash (browser impl)', () => {
    hashToolkitBrowser(longString);
  });

  bench('ohash', () => {
    hashOhash(longString);
  });

  bench('object-hash', () => {
    objectHash(longString);
  });
});
