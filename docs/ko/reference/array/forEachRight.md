# forEachRight

배열의 요소를 오른쪽에서 왼쪽으로 순회하며 각 요소에 대해 함수를 실행해요.

```typescript
forEachRight(arr, callback);
```

## 사용법

### `forEachRight(arr, callback)`

배열을 역순으로 순회하면서 각 요소에 대해 작업을 수행하고 싶을 때 `forEachRight`를 사용하세요. 배열의 마지막 요소부터 첫 번째 요소까지 순서대로 콜백 함수를 호출해요. 역순 처리가 필요한 경우나 배열의 끝에서부터 작업해야 할 때 유용해요.

```typescript
import { forEachRight } from 'es-toolkit/array';

const array = [1, 2, 3];
const result: number[] = [];

// forEachRight 함수를 사용하여 배열을 역순으로 순회해요.
forEachRight(array, value => {
  result.push(value);
});

console.log(result); // [3, 2, 1]
```

콜백 함수는 세 가지 파라미터를 받아요.

```typescript
import { forEachRight } from 'es-toolkit/array';

const array = ['a', 'b', 'c'];
forEachRight(array, (value, index, arr) => {
  console.log(`값: ${value}, 인덱스: ${index}, 배열:`, arr);
});
// 출력:
// 값: c, 인덱스: 2, 배열: ['a', 'b', 'c']
// 값: b, 인덱스: 1, 배열: ['a', 'b', 'c']
// 값: a, 인덱스: 0, 배열: ['a', 'b', 'c']
```

#### 파라미터

- `arr` (`T[]`): 순회할 배열이에요.
- `callback` (`(value: T, index: number, arr: T[]) => void`): 각 요소에 대해 실행될 함수예요.
  - `value`: 현재 처리 중인 배열 요소예요.
  - `index`: 현재 처리 중인 요소의 인덱스예요.
  - `arr`: `forEachRight` 함수가 호출된 배열이에요.
