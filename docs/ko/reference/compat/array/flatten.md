# flatten (Lodash 호환성)

::: warning `es-toolkit`의 `flatten`을 사용하세요

이 `flatten` 함수는 `null`이나 `undefined` 처리, `ArrayLike` 타입 처리, 다양한 조건 함수 형태 지원 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [flatten](../../array/flatten.md)을 사용하세요.

:::

배열을 한 단계 평탄화해요.

```typescript
const result = flatten(array, depth);
```

## 사용법

### `flatten(value, depth)`

중첩 배열을 지정된 깊이만큼 평탄화해요. 기본적으로 한 단계만 평탄화하며, Arguments 객체나 Symbol.isConcatSpreadable을 가진 객체도 지원해요.

```typescript
import { flatten } from 'es-toolkit/compat';

// 기본 평탄화 (한 단계)
flatten([1, [2, [3, [4]], 5]]);
// 결과: [1, 2, [3, [4]], 5]

// 깊이 지정
flatten([1, [2, [3, [4]], 5]], 2);
// 결과: [1, 2, 3, [4], 5]

// Arguments 객체 지원
function example() {
  return flatten(arguments);
}
example(1, [2, 3], [[4]]);
// 결과: [1, 2, 3, [4]]
```

빈 배열이나 null, undefined는 빈 배열을 반환해요.

```typescript
import { flatten } from 'es-toolkit/compat';

flatten(null); // []
flatten(undefined); // []
flatten([]); // []
```

Symbol.isConcatSpreadable을 가진 객체도 배열처럼 평탄화돼요.

```typescript
import { flatten } from 'es-toolkit/compat';

const spreadable = { 0: 'a', 1: 'b', length: 2, [Symbol.isConcatSpreadable]: true };
flatten([1, spreadable, 3]);
// 결과: [1, 'a', 'b', 3]
```

#### 파라미터

- `value` (`ArrayLike<T> | null | undefined`): 평탄화할 배열이에요.
- `depth` (`number`, 선택): 평탄화할 최대 깊이예요. 기본값은 `1`이에요.

#### 반환 값

(`T[]`): 평탄화된 새 배열을 반환해요.
