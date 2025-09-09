import { bench, describe } from 'vitest';
import { uniqueId as uniqueIdToolkitCompat_ } from 'es-toolkit/compat';
import { uniqueId as uniqueIdLodash_ } from 'lodash';

const uniqueIdToolkitCompat = uniqueIdToolkitCompat_;
const uniqueIdLodash = uniqueIdLodash_;

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
