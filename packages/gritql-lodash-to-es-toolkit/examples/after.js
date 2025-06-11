// Example file showing es-toolkit/compat imports after transformation
// This file demonstrates the expected output after applying GritQL patterns
// 1. Default import → Namespace import
import * as _ from 'es-toolkit/compat';
// 2. Named imports
import { map, reduce } from 'es-toolkit/compat';
// 3. Individual function imports (same name) → Named imports
import { debounce } from 'es-toolkit/compat';
import { throttle } from 'es-toolkit/compat';
import { isEqual } from 'es-toolkit/compat';
// 4. Individual function imports (aliased) → Named imports with alias
import { debounce as myDebounce } from 'es-toolkit/compat';
import { cloneDeep as myCloneDeep } from 'es-toolkit/compat';
// 5. lodash-es imports → es-toolkit/compat imports
import { chunk, uniq } from 'es-toolkit/compat';
import { orderBy } from 'es-toolkit/compat';
// 6. Mixed quote styles preserved
import { merge } from 'es-toolkit/compat';
import { pick } from 'es-toolkit/compat';

// Usage examples (code remains the same)
const data = [1, 2, 3, 4, 5];

// Using namespace import
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

// Using es-toolkit/compat imports
const chunked = chunk(data, 2);
const unique = uniq([1, 2, 2, 3, 3, 4]);
const ordered = orderBy([{ a: 2 }, { a: 1 }], ['a'], ['desc']);

// Using transformed imports
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
