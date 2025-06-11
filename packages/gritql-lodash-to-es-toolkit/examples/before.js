// Example file showing various lodash import patterns
// This file demonstrates all the patterns that will be transformed
// 1. Default import
import _ from 'lodash';
// 2. Named imports
import { map, reduce } from 'lodash';
// 5. lodash-es imports
import { chunk, uniq } from 'lodash-es';
import { orderBy } from 'lodash-es';
import myCloneDeep from 'lodash/cloneDeep';
// 3. Individual function imports (same name)
import debounce from 'lodash/debounce';
// 4. Individual function imports (aliased)
import myDebounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
// 6. Mixed quote styles
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import throttle from 'lodash/throttle';

// Usage examples
const data = [1, 2, 3, 4, 5];

// Using default import
const doubled = _.map(data, x => x * 2);
const filtered = _.filter(data, x => x > 2);

// Using named imports
const mapped = map(data, x => x * 3);
const reduced = reduce(data, (acc, val) => acc + val, 0);

// Using individual imports
const debouncedFn = debounce(() => {
  console.log('Debounced!');
}, 300);

const throttledFn = throttle(() => {
  console.log('Throttled!');
}, 1000);

const equalCheck = isEqual({ a: 1 }, { a: 1 });

// Using aliased imports
const myDebouncedFn = myDebounce(() => {
  console.log('My debounced function');
}, 500);

const cloned = myCloneDeep({ a: 1, b: { c: 2 } });

// Using lodash-es imports
const chunked = chunk(data, 2);
const unique = uniq([1, 2, 2, 3, 3, 4]);
const ordered = orderBy([{ a: 2 }, { a: 1 }], ['a'], ['desc']);

// Using mixed quote imports
const merged = merge({ a: 1 }, { b: 2 });
const picked = pick({ a: 1, b: 2, c: 3 }, ['a', 'b']);

export {
  doubled,
  filtered,
  mapped,
  reduced,
  debouncedFn,
  throttledFn,
  equalCheck,
  myDebouncedFn,
  cloned,
  chunked,
  unique,
  ordered,
  merged,
  picked,
};
