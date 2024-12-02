import { bench, describe } from 'vitest';
import { sortedIndex as sortedIndexToolkitCompat_ } from 'es-toolkit/compat';
import { sortedIndex as sortedIndexLodash_ } from 'lodash';

const sortedIndexToolkitCompat = sortedIndexToolkitCompat_;
const sortedIndexLodash = sortedIndexLodash_;

describe('sortedIndex', () => {
  bench('es-toolkit/compat', () => {
    sortedIndexToolkitCompat([30, 50], 40);
  });
  bench('lodash/sortedIndex', () => {
    sortedIndexLodash([30, 50], 40);
  });
});
