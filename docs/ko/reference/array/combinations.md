# combinations

배열에서 길이가 `r`인 모든 조합을 반환해요.

```typescript
const result = combinations(arr, r);
```

## 사용법

### `combinations(arr, r)`

순서를 무시하고 배열에서 `r`개 요소를 고르는 모든 경우가 필요할 때 `combinations`를 사용하세요. 결과는 입력 배열에서의 위치를 기준으로 사전순으로 나와요.

`0 <= r <= n`이면 조합의 개수는 `n! / r! / (n - r)!`이고, `r > n`이면 `0`이에요.

```typescript
import { combinations } from 'es-toolkit/array';

// 4개 중에서 2개 알파벳을 골라요.
combinations(['A', 'B', 'C', 'D'], 2);
// Returns: [['A','B'], ['A','C'], ['A','D'], ['B','C'], ['B','D'], ['C','D']]

// 4개 중에서 3개 숫자를 골라요.
combinations([0, 1, 2, 3], 3);
// Returns: [[0,1,2], [0,1,3], [0,2,3], [1,2,3]]
```

요소는 값이 아니라 위치로 구분돼요. 그래서 입력에 같은 값이 있으면, 똑같이 보이는 조합이 여러 번 나올 수 있어요.

```typescript
import { combinations } from 'es-toolkit/array';

combinations([1, 1, 2], 2);
// Returns: [[1, 1], [1, 2], [1, 2]]
```

`r`이 `0`이면 빈 조합 하나가 담긴 배열이 나와요. `r`이 배열의 길이보다 크면 빈 배열을 반환해요.

```typescript
import { combinations } from 'es-toolkit/array';

combinations([1, 2, 3], 0); // [[]]
combinations([1, 2], 5); // []
```

#### 파라미터

- `arr` (`readonly T[]`): 요소를 고를 배열이에요.
- `r` (`number`): 각 조합의 길이예요. 0 이상의 정수여야 해요.

#### 반환 값

(`T[][]`): 길이가 `r`인 조합들의 배열을 반환해요.

#### 에러

`r`이 0 이상의 정수가 아니면 에러를 던져요.

## 사용해보기

::: sandpack

```ts index.ts
import { combinations } from 'es-toolkit/array';

console.log(combinations(['A', 'B', 'C', 'D'], 2));
```

:::
