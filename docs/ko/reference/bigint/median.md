# median (`BigInt`)

`BigInt` 배열의 중앙값을 반환해요.

```typescript
const middle = median(numbers);
```

::: info

이 함수는 다른 숫자 타입의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/bigint`에서만 사용할 수 있어요.

:::

## 사용법

### `median(nums)`

여러 `BigInt`의 중앙값을 구하고 싶을 때 `median`을 사용하세요. 배열의 복사본을 정렬해서 가운데 값을 반환하기 때문에, 원래 배열은 그대로 유지돼요.

```typescript
import { median } from 'es-toolkit/bigint';

const middle = median([1n, 2n, 3n, 4n, 5n]);
console.log(middle); // 3n

// 배열을 미리 정렬해둘 필요는 없어요
console.log(median([5n, 1n, 4n, 2n, 3n])); // 3n
```

배열의 요소 개수가 짝수면 가운데 두 값의 평균을 구해요. `BigInt`에는 소수 부분이 없기 때문에, 이 평균은 **0 방향으로 버려져요**.

```typescript
import { median } from 'es-toolkit/bigint';

// (2n + 3n) / 2n은 2.5가 아니라 2n이에요
console.log(median([1n, 2n, 3n, 4n])); // 2n

// (1n + 2n) / 2n은 1n이에요
console.log(median([1n, 2n])); // 1n

// 0 방향으로 버려지기 때문에, -3n이 아니라 -2n이에요
console.log(median([-3n, -2n])); // -2n
```

`BigInt`에는 `NaN`이 없어서 "중앙값이 없다"를 뜻하는 `BigInt`가 없기 때문에, 빈 배열은 대체 값을 반환하는 대신 에러를 던져요.

```typescript
import { median } from 'es-toolkit/bigint';

median([]); // RangeError: Cannot compute the median of an empty array.
```

#### 파라미터

- `nums` (`readonly bigint[]`): 중앙값을 계산할 `BigInt` 배열이에요.

#### 반환 값

(`bigint`): 배열의 중앙값을 반환해요. 요소 개수가 짝수면 가운데 두 값의 평균을 0 방향으로 버린 값을 반환해요.

#### 에러

배열이 비어 있으면 `RangeError`를 던져요.
