# pullAt

배열에서 지정된 인덱스의 요소들을 제거하고, 제거된 요소들을 반환해요.

```typescript
const removed = pullAt(arr, indices);
```

## 레퍼런스

### `pullAt(arr, indicesToRemove)`

배열의 특정 위치에 있는 요소들을 제거하고 싶을 때 `pullAt`을 사용하세요. 이 함수는 원본 배열을 수정하고, 제거된 요소들을 새로운 배열로 반환해요. 음수 인덱스도 지원하며, 배열의 끝에서부터 계산해요.

```typescript
import { pullAt } from 'es-toolkit/array';

// 여러 인덱스의 요소를 한 번에 제거해요.
const numbers = [10, 20, 30, 40, 50];
const removed = pullAt(numbers, [1, 3, 4]);
console.log(removed); // [20, 40, 50]
console.log(numbers); // [10, 30]

// 음수 인덱스를 사용해서 뒤에서부터 제거해요.
const letters = ['a', 'b', 'c', 'd', 'e'];
const removedLetters = pullAt(letters, [-1, -3]);
console.log(removedLetters); // ['e', 'c']
console.log(letters); // ['a', 'b', 'd']

// 중복된 인덱스가 있어도 안전하게 처리해요.
const fruits = ['apple', 'banana', 'cherry', 'date'];
const removedFruits = pullAt(fruits, [1, 2, 1]);
console.log(removedFruits); // ['banana', 'cherry', undefined]
console.log(fruits); // ['apple', 'date']
```

존재하지 않는 인덱스를 지정하면 해당 위치에는 `undefined`가 반환돼요.

```typescript
import { pullAt } from 'es-toolkit/array';

const items = [1, 2, 3];
const removed = pullAt(items, [0, 5, 2]);
console.log(removed); // [1, undefined, 3]
console.log(items); // [2]
```

#### 파라미터

- `arr` (`T[]`): 요소를 제거할 배열이에요.
- `indicesToRemove` (`number[]`): 제거할 요소들의 인덱스 배열이에요. 음수 인덱스는 배열의 끝에서부터 계산돼요.

#### 반환 값

(`T[]`): 제거된 요소들로 구성된 새로운 배열이에요. 존재하지 않는 인덱스에 대해서는 `undefined`가 포함돼요.
