# toFilled

배열의 일부 또는 전체를 지정한 값으로 채워 새 배열을 만들어요.

```typescript
const filled = toFilled(arr, value, start?, end?);
```

## 레퍼런스

### `toFilled(arr, value, start?, end?)`

배열의 특정 범위를 지정한 값으로 채우고 싶을 때 `toFilled`를 사용하세요. 원본 배열을 수정하지 않고 새 배열을 만들어 반환해요.

```typescript
import { toFilled } from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5];

// 인덱스 2부터 끝까지 '*'로 채워요.
toFilled(array, '*', 2);
// Returns: [1, 2, '*', '*', '*']

// 인덱스 1부터 4 전까지 '*'로 채워요.
toFilled(array, '*', 1, 4);
// Returns: [1, '*', '*', '*', 5]
```

시작과 끝 위치를 생략하면 전체 배열을 채워요.

```typescript
import { toFilled } from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5];

toFilled(array, '*');
// Returns: ['*', '*', '*', '*', '*']
```

음수 인덱스를 사용할 수도 있어요. 배열의 끝에서부터 계산해요.

```typescript
import { toFilled } from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5];

// 뒤에서 4번째부터 뒤에서 1번째 전까지 '*'로 채워요.
toFilled(array, '*', -4, -1);
// Returns: [1, '*', '*', '*', 5]
```

#### 파라미터

- `arr` (`T[]`): 기반이 되는 원본 배열이에요.
- `value` (`U`): 배열을 채울 값이에요.
- `start` (`number`, 선택): 채우기 시작 위치예요. 기본값은 `0`이에요.
- `end` (`number`, 선택): 채우기 끝 위치예요. 기본값은 배열의 길이예요.

#### 반환 값

(`Array<T | U>`): 지정된 범위가 값으로 채워진 새 배열을 반환해요. 원본 배열은 수정되지 않아요.
