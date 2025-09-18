# pullAll (Lodash 호환성)

::: warning `es-toolkit`의 [pull](../../array/pull.md)을 사용하세요

이 `pullAll` 함수는 Lodash의 호환성을 위한 함수로, 더 복잡한 타입 처리와 오버로딩으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [pull](../../array/pull.md)을 사용하세요.

:::

배열에서 지정한 값들을 담은 배열의 모든 값을 제거해요.

```typescript
const result = pullAll(array, valuesToRemove);
```

## 레퍼런스

### `pullAll(array, valuesToRemove)`

배열에서 `valuesToRemove` 배열에 포함된 모든 값을 제거하고 원본 배열을 수정해요. `pull` 함수와 비슷하지만, 제거할 값들을 배열로 받아요.

```typescript
import { pullAll } from 'es-toolkit/compat';

// 숫자 배열에서 특정 값들 제거
const numbers = [1, 2, 3, 2, 4, 2, 5];
pullAll(numbers, [2, 3]);
console.log(numbers); // [1, 4, 5]

// 문자열 배열에서 특정 값들 제거
const fruits = ['apple', 'banana', 'apple', 'cherry', 'banana'];
pullAll(fruits, ['apple', 'banana']);
console.log(fruits); // ['cherry']
```

빈 배열이나 `null`, `undefined`를 넣으면 아무것도 제거하지 않아요.

```typescript
import { pullAll } from 'es-toolkit/compat';

const numbers = [1, 2, 3];
pullAll(numbers, []);
console.log(numbers); // [1, 2, 3]

pullAll(numbers, null);
console.log(numbers); // [1, 2, 3]
```

#### 파라미터

- `array` (`T[]`): 수정할 배열이에요.
- `valuesToRemove` (`ArrayLike<T>`, 선택): 배열에서 제거할 값들을 담은 배열이에요. 기본값은 `[]`이에요.

### 반환 값

(`T[]`): 수정된 원본 배열을 반환해요.
