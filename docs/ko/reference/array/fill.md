# fill

배열의 요소를 지정된 값으로 채워요. 원본 배열을 직접 수정해요.

```typescript
const filled = fill(arr, value, start, end);
```

::: info 원본 배열을 수정하지 않으려면 [`toFilled`](./toFilled.md)를 사용하세요.

`toFilled`는 원본 배열을 수정하는 대신 새 배열을 반환해요.

:::

## 사용법

### `fill(arr, value, start?, end?)`

배열의 특정 범위를 지정된 값으로 채우고 싶을 때 `fill`을 사용하세요. 시작 위치부터 끝 위치 직전까지의 요소들을 제공된 값으로 대체해요. 시작이나 끝 위치를 지정하지 않으면 배열 전체를 채워요.

```typescript
import { fill } from 'es-toolkit/array';

// 배열 전체를 'a'로 채워요.
const array1 = [1, 2, 3];
fill(array1, 'a');
// Returns: ['a', 'a', 'a']

// 빈 배열을 2로 채워요.
const array2 = Array(3);
fill(array2, 2);
// Returns: [2, 2, 2]

// 인덱스 1부터 3 직전까지 '*'로 채워요.
const array3 = [4, 6, 8, 10];
fill(array3, '*', 1, 3);
// Returns: [4, '*', '*', 10]
```

음수 인덱스를 사용할 수도 있어요. 음수 인덱스는 배열의 끝에서부터 계산해요.

```typescript
import { fill } from 'es-toolkit/array';

const array = [1, 2, 3];
fill(array, '*', -2, -1);
// Returns: [1, '*', 3]
```

#### 파라미터

- `arr` (`Array<T | U>`): 채울 배열이에요.
- `value` (`U`): 배열을 채울 값이에요.
- `start` (`number`, 선택): 시작 위치예요. 기본값은 `0`이에요.
- `end` (`number`, 선택): 끝 위치예요. 기본값은 배열의 길이예요.

#### 반환 값

(`Array<T | U>`): 값으로 채워진 원본 배열을 반환해요.
