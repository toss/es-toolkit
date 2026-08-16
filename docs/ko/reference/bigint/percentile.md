# percentile (`BigInt`)

배열에서 주어진 백분위수에 해당하는 `BigInt`를 반환해요.

```typescript
const value = percentile(numbers, 90);
```

::: info

이 함수는 다른 숫자 타입의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/bigint`에서만 사용할 수 있어요.

:::

## 사용법

### `percentile(arr, percentile)`

데이터의 일정 비율이 그 아래에 놓이는 값을 알고 싶을 때, 예를 들어 p90 응답 시간을 구할 때 `percentile`을 사용하세요. 배열의 복사본을 정렬해서 해당 순위의 값을 골라주기 때문에, 원래 배열은 그대로 유지돼요.

```typescript
import { percentile } from 'es-toolkit/bigint';

const latencies = [1n, 2n, 3n, 4n, 5n];

console.log(percentile(latencies, 50)); // 3n
console.log(percentile(latencies, 90)); // 5n

// 배열을 미리 정렬해둘 필요는 없어요
console.log(percentile([30n, 10n, 20n], 50)); // 20n
```

이 함수는 [최근접 순위 방법](https://en.wikipedia.org/wiki/Percentile#The_nearest-rank_method)을 사용하기 때문에, 결과는 항상 배열에 이미 들어 있는 값이에요. 두 값 사이를 보간하지 않기 때문에, 반올림할 일도 없어요.

```typescript
import { percentile } from 'es-toolkit/bigint';

// 1n과 2n의 중간값은 1.5인데 어떤 BigInt로도 표현할 수 없기 때문에,
// 대신 가장 가까운 순위의 값이 반환돼요.
console.log(percentile([1n, 2n], 50)); // 1n

// 0은 항상 가장 작은 값을, 100은 항상 가장 큰 값을 반환해요
console.log(percentile([5n, 1n, 3n], 0)); // 1n
console.log(percentile([5n, 1n, 3n], 100)); // 5n
```

백분위수 자체는 `BigInt`가 아니라 `0`부터 `100` 사이의 일반적인 `number`예요. 측정 대상이 되는 양이 아니라 비율이기 때문이에요.

```typescript
import { percentile } from 'es-toolkit/bigint';

percentile([1n, 2n, 3n], 101); // Error: Expected percentile to be <= 100 but got "101".
percentile([], 50); // RangeError: Cannot compute the percentile of an empty array.
```

#### 파라미터

- `arr` (`readonly bigint[]`): 백분위수를 계산할 `BigInt` 배열이에요.
- `percentile` (`number`): 찾으려는 백분위수예요. `0`부터 `100` 사이의 값이에요.

#### 반환 값

(`bigint`): 주어진 백분위수에 해당하는 `BigInt`를 반환해요. 항상 배열에 이미 들어 있는 값 중 하나예요.

#### 에러

`percentile`이 `NaN`이거나, `0`보다 작거나, `100`보다 크면 에러를 던져요. 배열이 비어 있으면 `RangeError`를 던져요.
