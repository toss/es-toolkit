// Example file - using lodash
import _ from 'lodash';
import { filter, map, reduce } from 'lodash';
import { cloneDeep } from 'lodash-es';
import debounce from 'lodash/debounce';
import { pipe } from 'lodash/fp';
import throttle from 'lodash/throttle';

// Examples of using various lodash functions
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

const pipeExample = pipe(
  x => x + 1,
  x => x * 2
)(5);

export { doubledData, filteredData, mappedData, sum, debouncedFn, throttledFn, clonedObject, pipeExample };
