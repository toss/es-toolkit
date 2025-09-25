# slice (Lodash 호환성)

::: warning `Array.prototype.slice`를 사용하세요

이 `slice` 함수는 `null`이나 `undefined` 처리와 희소 배열의 특별한 처리로 인해 느리게 동작해요. JavaScript의 기본 `Array.prototype.slice` 메소드는 더 빠르고 표준화되어 있어요.

대신 더 빠르고 현대적인 `Array.prototype.slice`를 사용하세요.

:::

배열의 일부분을 잘라서 새로운 배열을 만들어요.

```typescript
const sliced = slice(array, start, end);
```

## 레퍼런스

### `slice(array, start, end)`

배열의 특정 부분만 필요할 때 `slice`를 사용하세요. 시작 위치부터 끝 위치 바로 전까지의 요소들을 포함하는 새 배열을 만들어요.

```typescript
import { slice } from 'es-toolkit/compat';

// 인덱스 1부터 2까지 자르기
slice([1, 2, 3, 4], 1, 3);
// Returns: [2, 3]

// 음수 인덱스 사용
slice([1, 2, 3, 4], -2);
// Returns: [3, 4]

// 시작 위치만 지정
slice([1, 2, 3, 4], 2);
// Returns: [3, 4]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { slice } from 'es-toolkit/compat';

slice(null); // []
slice(undefined); // []
```

희소 배열을 처리할 때 빈 슬롯을 `undefined`로 채워요.

```typescript
import { slice } from 'es-toolkit/compat';

const sparse = new Array(3);
sparse[1] = 'b';
slice(sparse);
// Returns: [undefined, 'b', undefined]
```

음수 인덱스를 사용하면 배열의 끝에서부터 계산해요.

```typescript
import { slice } from 'es-toolkit/compat';

slice([1, 2, 3, 4, 5], -3, -1);
// Returns: [3, 4]
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 자를 배열이에요.
- `start` (`number`, 선택): 시작 위치예요. 음수 값은 끝에서부터 계산해요. 기본값은 `0`이에요.
- `end` (`number`, 선택): 끝 위치예요 (포함하지 않음). 음수 값은 끝에서부터 계산해요. 기본값은 배열의 길이예요.

#### 반환 값

(`T[]`): `start`부터 `end` 바로 전까지의 요소들을 포함하는 새로운 배열을 반환해요.
