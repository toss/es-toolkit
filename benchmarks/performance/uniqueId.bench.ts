import { bench, describe } from 'vitest';
import { uniqueId as uniqueIdToolkitCompat_ } from 'es-toolkit/compat';
import { uniqueId as uniqueIdLodash_ } from 'lodash';

const uniqueIdToolkitCompat = uniqueIdToolkitCompat_;
const uniqueIdLodash = uniqueIdLodash_;

describe('uniqueId', () => {
  bench('es-toolkit/compat/uniqueId', () => {
    uniqueIdToolkitCompat('321');
  });

  bench('lodash/uniqueId', () => {
    uniqueIdLodash('321');
  });
});
