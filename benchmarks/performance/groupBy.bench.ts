import { groupBy as groupByToolkit } from 'es-toolkit';
import { groupBy as groupByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('groupBy', () => {
  bench('es-toolkit/groupBy', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
      { category: 'fruit', name: 'pear' },
      { category: 'vegetable', name: 'broccoli' },
    ];

    groupByToolkit(array, item => item.category);
  });

  bench('es-toolkit/compat/groupBy', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
      { category: 'fruit', name: 'pear' },
      { category: 'vegetable', name: 'broccoli' },
    ];

    groupByToolkitCompat(array, item => item.category);
  });

  bench('lodash/groupBy', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
      { category: 'fruit', name: 'pear' },
      { category: 'vegetable', name: 'broccoli' },
    ];

    lodash.groupBy(array, item => item.category);
  });
});

group('groupBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({
    category: i % 2 === 0 ? 'even' : 'odd',
    value: i,
  }));

  bench('es-toolkit/groupBy', () => {
    groupByToolkit(largeArray, item => item.category);
  });

  bench('lodash/groupBy', () => {
    lodash.groupBy(largeArray, item => item.category);
  });
});
