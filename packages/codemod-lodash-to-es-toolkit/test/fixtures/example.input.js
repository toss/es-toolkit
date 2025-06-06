// 예제 파일 - lodash 사용
import _ from 'lodash';
import { filter, map, reduce } from 'lodash';
import { cloneDeep } from 'lodash-es';
import debounce from 'lodash/debounce';
import { pipe } from 'lodash/fp';
import throttle from 'lodash/throttle';

// 다양한 lodash 함수 사용 예제
const data = [1, 2, 3, 4, 5];

const doubledData = _.map(data, x => x * 2);
const filteredData = filter(data, x => x > 2);
const sum = reduce(data, (acc, val) => acc + val, 0);

const debouncedFn = debounce(() => {
  console.log('Debounced function called');
}, 300);

const throttledFn = throttle(() => {
  console.log('Throttled function called');
}, 1000);

const clonedObject = cloneDeep({ a: 1, b: { c: 2 } });

export { doubledData, filteredData, sum, debouncedFn, throttledFn, clonedObject };
