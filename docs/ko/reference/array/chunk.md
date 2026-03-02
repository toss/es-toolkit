# chunk

배열을 정해진 크기의 작은 배열들로 나눠 새 2차원 배열을 반환해요.

```typescript
const chunked = chunk(arr, size);
```

## 사용법

### `chunk(arr, size)`

긴 배열을 같은 크기의 여러 작은 배열로 나누고 싶을 때 `chunk`를 사용하세요. 배열을 똑같이 나눌 수 없다면, 마지막 배열이 남은 요소들을 포함해요.

```typescript
import { chunk } from 'es-toolkit/array';

// 숫자 배열을 크기 2로 나눠요.
chunk([1, 2, 3, 4, 5], 2);
// Returns: [[1, 2], [3, 4], [5]]

// 문자열 배열을 크기 3으로 나눠요.
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
```

빈 배열을 나누면 빈 배열이 반환돼요.

```typescript
import { chunk } from 'es-toolkit/array';

chunk([], 2); // []
```

#### 파라미터

- `arr` (`T[]`): 나눌 배열이에요.
- `size` (`number`): 각 작은 배열의 크기예요. 양의 정수여야 해요.

#### 반환 값

(`T[][]`): 크기 `size`로 나눠진 2차원 배열을 반환해요.

#### 에러

`size`가 양의 정수가 아니면 에러를 던져요.

## 사용해보기

::: sandpack

```ts index.ts
import { chunk } from 'es-toolkit/array';

console.log(chunk([1, 2, 3, 4, 5], 2));
```

:::

## Lodash 호환성

`es-toolkit/compat`에서 `chunk`를 가져오면 lodash와 호환돼요.

- `size`가 1보다 작으면 빈 배열을 반환해요.
- `size`에 소수점이 있는 숫자를 제공하더라도, 정수로 내림해요.

```typescript
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3], 0); // Returns []
```

## 성능 비교

|                   | [번들 사이즈](../../bundle-size.md) | [런타임 성능](../../performance.md) |
| ----------------- | ----------------------------------- | ----------------------------------- |
| es-toolkit        | 238 바이트 (92.4% 작음)             | 9,338,821 회 (11% 느림)             |
| es-toolkit/compat | 307 바이트 (90.2% 작음)             | 9,892,157 회 (5% 느림)              |
| lodash-es         | 3,153 바이트                        | 10,523,270 회                       |
