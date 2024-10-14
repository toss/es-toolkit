import { constant as constantToolkitCompat } from 'es-toolkit/compat';
import { constant as constantToLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('constant', () => {
  bench(
    'es-toolkit/compat/constant',
    () => {
      constantToolkitCompat([1, 2, 3]);
      constantToolkitCompat({ a: 1 });
      constantToolkitCompat(1);
      constantToolkitCompat('a');
    },
    {
      time: 50,
    }
  );

  bench(
    'lodash/constant',
    () => {
      constantToLodash([1, 2, 3]);
      constantToLodash({ a: 1 });
      constantToLodash(1);
      constantToLodash('a');
    },
    {
      time: 50,
    }
  );
});
