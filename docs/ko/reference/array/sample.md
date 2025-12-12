# sample

배열에서 무작위로 선택된 하나의 요소를 반환해요.

```typescript
const randomElement = sample(arr);
```

## 사용법

### `sample(arr)`

배열에서 무작위로 하나의 요소를 가져오고 싶을 때 `sample`을 사용하세요. 게임에서 랜덤 아이템을 선택하거나, 테스트용 데이터를 랜덤하게 가져오거나, 추첨을 할 때 유용해요.

```typescript
import { sample } from 'es-toolkit/array';

// 숫자 배열에서 무작위로 하나를 선택해요.
const numbers = [1, 2, 3, 4, 5];
const randomNumber = sample(numbers);
// Returns: 1, 2, 3, 4, 5 중 하나

// 문자열 배열에서 무작위로 하나를 선택해요.
const fruits = ['apple', 'banana', 'cherry', 'date'];
const randomFruit = sample(fruits);
// Returns: 'apple', 'banana', 'cherry', 'date' 중 하나

// 객체 배열에서 무작위로 하나를 선택해요.
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
];
const randomUser = sample(users);
// Returns: 세 명의 사용자 중 무작위로 하나
```

다양한 타입의 배열에서도 사용할 수 있어요.

```typescript
import { sample } from 'es-toolkit/array';

// 불린 배열
const booleans = [true, false];
const randomBoolean = sample(booleans);
// Returns: true 또는 false

// 혼합 타입 배열
const mixed = [1, 'hello', { key: 'value' }, [1, 2, 3]];
const randomItem = sample(mixed);
// Returns: 배열에 있는 요소 중 아무거나
```

#### 파라미터

- `arr` (`readonly T[]`): 무작위로 요소를 선택할 배열이에요.

#### 반환 값

(`T`): 배열에서 무작위로 선택된 요소예요.
