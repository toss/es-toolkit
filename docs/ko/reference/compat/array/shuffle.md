# shuffle (Lodash 호환성)

::: warning `es-toolkit`의 `shuffle`을 사용하세요

이 `shuffle` 함수는 Lodash와의 호환성을 위해 추가적인 처리가 포함되어 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [shuffle](../../array/shuffle.md)을 사용하세요.

:::

배열이나 객체의 요소들을 무작위로 섞어서 새로운 배열을 반환해요.

```typescript
const result = shuffle(collection);
```

## 레퍼런스

### `shuffle(collection)`

Fisher-Yates 알고리즘을 사용하여 배열이나 객체의 요소들을 무작위로 섞어서 새로운 배열을 반환해요. 원본은 변경되지 않아요.

```typescript
import { shuffle } from 'es-toolkit/compat';

// 숫자 배열 섞기
const numbers = [1, 2, 3, 4, 5];
const shuffled1 = shuffle(numbers);
// Returns: 예를 들어 [3, 1, 5, 2, 4] (매번 다른 순서)

// 문자열 배열 섞기
const fruits = ['apple', 'banana', 'cherry', 'date'];
const shuffled2 = shuffle(fruits);
// Returns: 예를 들어 ['cherry', 'apple', 'date', 'banana']

// 객체의 값들 섞기
const obj = { a: 1, b: 2, c: 3, d: 4 };
const shuffled3 = shuffle(obj);
// Returns: 예를 들어 [3, 1, 4, 2] (객체 값들이 무작위로 섞임)
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { shuffle } from 'es-toolkit/compat';

shuffle(null);
// Returns: []

shuffle(undefined);
// Returns: []
```

#### 파라미터

- `collection` (`ArrayLike<T> | T | null | undefined`): 섞을 배열이나 객체예요.

#### 반환 값

(`T[]`): 요소들이 무작위로 섞인 새로운 배열을 반환해요.
