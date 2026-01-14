# fromPairs

키-값 쌍의 배열을 객체로 변환합니다.

```typescript
const object = fromPairs(pairs);
```

## 사용법

### `fromPairs(pairs)`

키-값 쌍의 배열을 하나의 객체로 변환하고 싶을 때 `fromPairs`를 사용하세요. 각 쌍은 두 개의 요소를 가진 배열이어야 하며, 첫 번째 요소는 키가 되고 두 번째 요소는 값이 됩니다.

이 함수는 `Object.entries` 또는 객체를 키-값 쌍 배열로 변환하는 유사한 함수의 역함수입니다.

```typescript
import { fromPairs } from 'es-toolkit/array';

// 키-값 쌍을 객체로 변환
const pairs = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
const result = fromPairs(pairs);
// 결과: { a: 1, b: 2, c: 3 }

// 다양한 키 타입과 함께 사용
const symbolKey = Symbol('key');
const mixedPairs = [
  ['stringKey', 'value1'],
  [42, 'value2'],
  [symbolKey, 'value3'],
];
const mixedResult = fromPairs(mixedPairs);
// 결과: { stringKey: 'value1', 42: 'value2', [symbolKey]: 'value3' }
```

중복된 키가 있는 경우, 마지막 값이 사용됩니다.

```typescript
import { fromPairs } from 'es-toolkit/array';

const duplicatePairs = [
  ['a', 1],
  ['b', 2],
  ['a', 3],
];
const result = fromPairs(duplicatePairs);
// 결과: { a: 3, b: 2 }
```

#### 파라미터

- `pairs` (`ReadonlyArray<readonly [K, V]>`): 객체로 변환할 키-값 쌍의 배열입니다.

#### 반환값

(`Record<K, V>`): 키-값 쌍으로부터 생성된 새로운 객체를 반환합니다.
