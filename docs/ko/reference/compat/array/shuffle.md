# shuffle (Lodash 호환성)

::: warning `es-toolkit`의 `shuffle`을 사용하세요

이 `shuffle` 함수는 Lodash와의 호환성을 위해 추가적인 처리가 포함되어 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [shuffle](../../array/shuffle.md)을 사용하세요.

:::

배열의 요소들을 무작위로 섮어서 새로운 배열을 반환해요.

```typescript
const result = shuffle([1, 2, 3, 4, 5]);
// result는 예를 들어 [3, 1, 5, 2, 4] 같이 무작위로 섮인 배열이 돼요.
```

## 레퍼런스

### `shuffle(array)`

Fisher-Yates 셈플 알고리즘을 사용하여 배열의 요소들을 무작위로 섮어서 새로운 배열을 반환해요. 원본 배열은 변경되지 않아요.

```typescript
import { shuffle } from 'es-toolkit/compat';

// 숫자 배열 섮기
const numbers = [1, 2, 3, 4, 5];
const shuffled1 = shuffle(numbers);
// Returns: 예를 들어 [3, 1, 5, 2, 4] (매번 다른 순서)

// 문자열 배열 섮기
const fruits = ['apple', 'banana', 'cherry', 'date'];
const shuffled2 = shuffle(fruits);
// Returns: 예를 들어 ['cherry', 'apple', 'date', 'banana']

// 빈 배열 처리
const shuffled3 = shuffle([]);
// Returns: []

// 원본 배열은 변경되지 않음
console.log(numbers); // [1, 2, 3, 4, 5] (그대로 유지)
```

#### 파라미터

- `array` (`T[]`): 섮을 배열이에요.

#### 반환 값

(`T[]`): 요소들이 무작위로 섮인 새로운 배열이에요.
