import { bench, describe } from 'vitest';
import { uniqueId as uniqueIdToolkitCompat } from 'es-toolkit/compat';
import { uniqueId as uniqueIdLodash } from 'lodash';

describe('uniqueId', () => {
  bench('es-toolkit/compat/uniqueId', () => {
    uniqueIdToolkitCompat();
    uniqueIdToolkitCompat();
    uniqueIdToolkitCompat();
    uniqueIdToolkitCompat();
    uniqueIdToolkitCompat();
    uniqueIdToolkitCompat('prefix_');
    uniqueIdToolkitCompat('prefix_');
    uniqueIdToolkitCompat('prefix_');
    uniqueIdToolkitCompat('prefix_');
    uniqueIdToolkitCompat('prefix_');
  });

  bench('lodash/uniqueId', () => {
    uniqueIdLodash();
    uniqueIdLodash();
    uniqueIdLodash();
    uniqueIdLodash();
    uniqueIdLodash();
    uniqueIdLodash('prefix_');
    uniqueIdLodash('prefix_');
    uniqueIdLodash('prefix_');
    uniqueIdLodash('prefix_');
    uniqueIdLodash('prefix_');
  });
});
