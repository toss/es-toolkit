import { hash as hashToolkit } from 'es-toolkit/util/hash';
import objectHash from 'object-hash';
import { hash as hashOhash } from 'ohash';
import { bench, do_not_optimize, group } from './harness.ts';
import { hash as hashToolkitBrowser } from '../../src/util/hash/browser.ts';

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

group('hash: small object', () => {
  bench('es-toolkit/util/hash (node)', () => {
    do_not_optimize(hashToolkit(smallObject));
  });

  bench('es-toolkit/util/hash (browser impl)', () => {
    do_not_optimize(hashToolkitBrowser(smallObject));
  });

  bench('ohash', () => {
    do_not_optimize(hashOhash(smallObject));
  });

  bench('object-hash', () => {
    do_not_optimize(objectHash(smallObject));
  });
});

group('hash: medium object (100 keys)', () => {
  bench('es-toolkit/util/hash (node)', () => {
    do_not_optimize(hashToolkit(mediumObject));
  });

  bench('es-toolkit/util/hash (browser impl)', () => {
    do_not_optimize(hashToolkitBrowser(mediumObject));
  });

  bench('ohash', () => {
    do_not_optimize(hashOhash(mediumObject));
  });

  bench('object-hash', () => {
    do_not_optimize(objectHash(mediumObject));
  });
});

group('hash: large array (1,000 objects)', () => {
  bench('es-toolkit/util/hash (node)', () => {
    do_not_optimize(hashToolkit(largeArray));
  });

  bench('es-toolkit/util/hash (browser impl)', () => {
    do_not_optimize(hashToolkitBrowser(largeArray));
  });

  bench('ohash', () => {
    do_not_optimize(hashOhash(largeArray));
  });

  bench('object-hash', () => {
    do_not_optimize(objectHash(largeArray));
  });
});

group('hash: long string (~10KB)', () => {
  bench('es-toolkit/util/hash (node)', () => {
    do_not_optimize(hashToolkit(longString));
  });

  bench('es-toolkit/util/hash (browser impl)', () => {
    do_not_optimize(hashToolkitBrowser(longString));
  });

  bench('ohash', () => {
    do_not_optimize(hashOhash(longString));
  });

  bench('object-hash', () => {
    do_not_optimize(objectHash(longString));
  });
});
