# shuffle

배열의 요소 순서를 무작위로 섞은 새 배열을 반환해요.

```typescript
const shuffled = shuffle(arr);
```

## 레퍼런스

### `shuffle(arr)`

배열의 요소들을 무작위로 섞고 싶을 때 `shuffle`을 사용하세요. Fisher-Yates 알고리즘을 사용해서 모든 순열이 동일한 확률로 나타나도록 완벽한 무작위 섞기를 보장해요. 카드 게임에서 덱을 섞거나, 퀴즈 문제 순서를 랜덤화하거나, 플레이리스트를 셔플할 때 유용해요.

```typescript
import { shuffle } from 'es-toolkit/array';

// 숫자 배열을 섞어요.
const numbers = [1, 2, 3, 4, 5];
const shuffledNumbers = shuffle(numbers);
// Returns: [3, 1, 4, 5, 2] (예시, 실제로는 무작위)
console.log(numbers); // [1, 2, 3, 4, 5] (원본은 변경되지 않음)

// 문자열 배열을 섞어요.
const fruits = ['apple', 'banana', 'cherry', 'date'];
const shuffledFruits = shuffle(fruits);
// Returns: ['cherry', 'apple', 'date', 'banana'] (예시, 실제로는 무작위)
```

다양한 타입의 배열을 섞을 수 있어요.

```typescript
import { shuffle } from 'es-toolkit/array';

// 객체 배열을 섞어요.
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
];
const shuffledUsers = shuffle(users);
// Returns: 사용자 객체들이 무작위 순서로 섞인 새 배열

// 혼합 타입 배열을 섞어요.
const mixed = [1, 'hello', true, { key: 'value' }];
const shuffledMixed = shuffle(mixed);
// Returns: 요소들이 무작위 순서로 섞인 새 배열
```

#### 파라미터

- `arr` (`readonly T[]`): 섞을 배열이에요.

#### 반환 값

(`T[]`): 요소들이 무작위 순서로 섞인 새 배열을 반환해요. 원본 배열은 변경되지 않아요.
