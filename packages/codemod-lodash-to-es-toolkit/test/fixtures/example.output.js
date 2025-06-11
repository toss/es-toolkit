// Example file - using es-toolkit/compat (after transformation)
import * as _ from 'es-toolkit/compat';
import { filter, map, reduce } from 'es-toolkit/compat';
import { debounce } from 'es-toolkit/compat';
import { throttle } from 'es-toolkit/compat';
import { cloneDeep } from 'es-toolkit/compat';

// Examples of using various es-toolkit/compat functions
const data = [1, 2, 3, 4, 5];

const doubledData = _.map(data, x => x * 2);
const filteredData = filter(data, x => x > 2);
const mappedData = map(data, x => x + 1);
const sum = reduce(data, (acc, val) => acc + val, 0);

const debouncedFn = debounce(() => {
  console.log('Debounced function called');
}, 300);

const throttledFn = throttle(() => {
  console.log('Throttled function called');
}, 1000);

const clonedObject = cloneDeep({ a: 1, b: { c: 2 } });

export { doubledData, filteredData, mappedData, sum, debouncedFn, throttledFn, clonedObject, pipeExample };
