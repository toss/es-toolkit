# nth (Lodash 호환성)

::: warning 배열 인덱스 접근을 사용하세요

이 `nth` 함수는 `null`이나 `undefined` 처리, 정수 변환 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 배열 인덱스 접근 (`array[index]` 또는 `array.at(index)`)을 사용하세요.

:::

배열에서 지정한 인덱스의 요소를 가져와요.

```typescript
const element = nth(array, index);
```

## 레퍼런스

### `nth(array, index)`

배열에서 지정한 인덱스의 요소를 반환해요. 음수 인덱스를 사용하면 배열 끝에서부터 계산해요. 인덱스가 범위를 벗어나면 `undefined`를 반환해요.

```typescript
import { nth } from 'es-toolkit/compat';

const array = [1, 2, 3, 4, 5];

// 양수 인덱스
nth(array, 1);
// => 2

// 음수 인덱스 (끝에서부터)
nth(array, -1);
// => 5

nth(array, -2);
// => 4

// 범위를 벗어난 인덱스
nth(array, 10);
// => undefined

nth(array, -10);
// => undefined
```

`null`이나 `undefined`는 `undefined`로 처리해요.

```typescript
import { nth } from 'es-toolkit/compat';

nth(null, 0); // undefined
nth(undefined, 0); // undefined
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 요소를 가져올 배열이에요.
- `index` (`number`, 선택): 가져올 요소의 인덱스예요. 음수면 끝에서부터 계산해요. 기본값은 `0`이에요.

### 반환 값

(`T | undefined`): 지정한 인덱스의 요소를 반환해요. 인덱스가 범위를 벗어나면 `undefined`를 반환해요.
