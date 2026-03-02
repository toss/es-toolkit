# pull (Lodash 호환성)

::: warning `es-toolkit`의 [pull](../../array/pull.md)을 사용하세요

이 `pull` 함수는 Lodash의 호환성을 위한 함수로, 더 복잡한 타입 처리와 오버로딩으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [pull](../../array/pull.md)을 사용하세요.

:::

배열에서 지정한 값들을 모두 제거해요.

```typescript
const result = pull(array, ...valuesToRemove);
```

## 사용법

### `pull(array, ...valuesToRemove)`

배열에서 지정한 값들을 모두 제거하고 원본 배열을 수정해요. 배열을 복사하지 않고 원본 배열을 직접 변경하므로 메모리를 절약할 수 있어요.

```typescript
import { pull } from 'es-toolkit/compat';

// 숫자 배열에서 특정 값들 제거
const numbers = [1, 2, 3, 2, 4, 2, 5];
pull(numbers, 2, 3);
console.log(numbers); // [1, 4, 5]

// 문자열 배열에서 특정 값들 제거
const fruits = ['apple', 'banana', 'apple', 'cherry'];
pull(fruits, 'apple');
console.log(fruits); // ['banana', 'cherry']
```

#### 파라미터

- `array` (`T[]`): 수정할 배열이에요.
- `...valuesToRemove` (`T[]`): 배열에서 제거할 값들이에요.

#### 반환 값

(`T[]`): 수정된 원본 배열을 반환해요.
