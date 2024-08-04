import { bench, describe } from 'vitest';
import { isEqual as isEqualToolkit } from 'es-toolkit';
import { isEqual as isEqualLodash } from 'lodash';

// describe('isEqual primitives', () => {
//   bench('es-toolkit/isEqual', () => {
//     isEqualToolkit(1, 1);
//     isEqualToolkit(NaN, NaN);
//     isEqualToolkit(+0, -0);

//     isEqualToolkit(true, true);
//     isEqualToolkit(true, false);

//     isEqualToolkit('hello', 'hello');
//     isEqualToolkit('hello', 'world');
//   });

//   bench('lodash/isEqual', () => {
//     isEqualLodash(1, 1);
//     isEqualLodash(NaN, NaN);
//     isEqualLodash(+0, -0);

//     isEqualLodash(true, true);
//     isEqualLodash(true, false);

//     isEqualLodash('hello', 'hello');
//     isEqualLodash('hello', 'world');
//   });
// });


// describe('isEqual dates', () => {
//   bench('es-toolkit/isEqual', () => {
//     isEqualToolkit(new Date('2020-01-01'), new Date('2020-01-01'));
//     isEqualToolkit(new Date('2020-01-01'), new Date('2021-01-01'));
//   });

//   bench('lodash', () => {
//     isEqualLodash(new Date('2020-01-01'), new Date('2020-01-01'));
//     isEqualLodash(new Date('2020-01-01'), new Date('2021-01-01'));
//   });
// });

// describe('isEqual RegExps', () => {
//   bench('es-toolkit/isEqual', () => {
//     isEqualToolkit(/hello/g, /hello/g);
//     isEqualToolkit(/hello/g, /hello/i);
//   });

//   bench('lodash', () => {
//     isEqualLodash(/hello/g, /hello/g);
//     isEqualLodash(/hello/g, /hello/i);
//   })
// })

describe('isEqual objects', () => {
  bench('es-toolkit/isEqual', () => {
    isEqualToolkit({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } });
    isEqualToolkit({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } });
    isEqualToolkit({ a: 1, b: 2 }, { a: 1, b: 2 });
  });

  bench('lodash', () => {
    isEqualLodash({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } });
    isEqualLodash({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } });
    isEqualLodash({ a: 1, b: 2 }, { a: 1, b: 2 });
  });
})

// describe('isEqual arrays', () => {
//   bench('es-toolkit/isEqual', () => {
//     isEqualToolkit([1, 2, 3], [1, 2, 3]);
//     isEqualToolkit([1, 2, 3], [1, 2, 4]);
//   });

//   bench('lodash', () => {
//     isEqualLodash([1, 2, 3], [1, 2, 3]);
//     isEqualLodash([1, 2, 3], [1, 2, 4]);
//   });
// })


