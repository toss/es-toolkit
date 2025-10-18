# remove

조건 함수에 따라 배열에서 요소를 제거하고 제거된 요소들을 새 배열로 반환해요. 원본 배열을 직접 수정해요.

```typescript
const removed = remove(arr, shouldRemoveElement);
```

## 레퍼런스

### `remove(arr, shouldRemoveElement)`

배열에서 특정 조건에 맞는 요소들을 제거하고 제거된 요소들을 확인하고 싶을 때 `remove`를 사용하세요. 이 함수는 원본 배열을 수정하면서 제거된 요소들을 별도 배열로 반환해요. 원본 배열을 유지하고 싶다면 `filter` 메서드를 사용하세요.

```typescript
import { remove } from 'es-toolkit/array';

// 짝수를 제거해요.
const numbers = [1, 2, 3, 4, 5];
const removedNumbers = remove(numbers, value => value % 2 === 0);
console.log(numbers); // [1, 3, 5] (원본 배열이 수정됨)
console.log(removedNumbers); // [2, 4] (제거된 요소들)

// 특정 조건의 객체를 제거해요.
const users = [
  { name: 'john', age: 25 },
  { name: 'jane', age: 17 },
  { name: 'bob', age: 30 },
];
const minors = remove(users, user => user.age < 18);
console.log(users); // [{ name: 'john', age: 25 }, { name: 'bob', age: 30 }]
console.log(minors); // [{ name: 'jane', age: 17 }]
```

인덱스와 원본 배열 정보도 사용할 수 있어요.

```typescript
import { remove } from 'es-toolkit/array';

// 인덱스 기반으로 요소를 제거해요.
const items = ['a', 'b', 'c', 'd', 'e'];
const removedAtEvenIndex = remove(items, (value, index) => index % 2 === 0);
console.log(items); // ['b', 'd']
console.log(removedAtEvenIndex); // ['a', 'c', 'e']
```

#### 파라미터

- `arr` (`T[]`): 수정할 배열이에요.
- `shouldRemoveElement` (`(value: T, index: number, array: T[]) => boolean`): 각 요소에 대해 호출되는 조건 함수예요. `true`를 반환하면 요소가 제거돼요.
  - `value`: 현재 처리 중인 요소예요.
  - `index`: 현재 요소의 인덱스예요.
  - `array`: 원본 배열이에요.

#### 반환 값

(`T[]`): 제거된 요소들로 구성된 새 배열을 반환해요.
