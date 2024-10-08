import { bench, describe } from 'vitest';
import { toSafeInteger as toSafeIntegerToolkitCompat_ } from 'es-toolkit/compat';
import { toSafeInteger as toSafeIntegerLodash_ } from 'lodash';

const toSafeIntegerToolkitCompat = toSafeIntegerToolkitCompat_;
const toSafeIntegerLodash = toSafeIntegerLodash_;

describe('toSafeInteger', () => {
  bench('es-toolkit/compat/toSafeInteger', () => {
    toSafeIntegerToolkitCompat({ valueOf: () => 1 });
    toSafeIntegerToolkitCompat({ valueOf: () => 2 });
    toSafeIntegerToolkitCompat({ toString: () => '3' });
    toSafeIntegerToolkitCompat('0b101010');
    toSafeIntegerToolkitCompat('0o12345');
    toSafeIntegerToolkitCompat('0x1a2b3c');
    toSafeIntegerToolkitCompat('1.1');
  });

  bench('lodash/toSafeInteger', () => {
    toSafeIntegerLodash({ valueof: () => 1 });
    toSafeIntegerLodash({ valueof: () => 2 });
    toSafeIntegerLodash({ toString: () => '3' });
    toSafeIntegerLodash('0b101010');
    toSafeIntegerLodash('0o12345');
    toSafeIntegerLodash('0x1a2b3c');
    toSafeIntegerLodash('1.1');
  });
});
