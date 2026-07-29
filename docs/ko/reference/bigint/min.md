# min (`BigInt`)

배열에서 가장 작은 `BigInt`를 반환해요.

```typescript
const smallest = min(numbers);
```

::: info

이 함수는 다른 숫자 타입의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/bigint`에서만 사용할 수 있어요.

:::

## 사용법

### `min(nums)`

여러 `BigInt` 중에서 가장 작은 값을 구하고 싶을 때 `min`을 사용하세요. `Math.min`은 `BigInt`를 아예 받을 수 없기 때문에, 이 함수로 비교해야 해요.

```typescript
import { min } from 'es-toolkit/bigint';

const smallest = min([1n, 5n, 3n]);
console.log(smallest); // 1n

// 음수에서도 동작해요
console.log(min([-5n, -1n, -3n])); // -5n
```

`BigInt`는 정확하게 비교되기 때문에, `number`였다면 같은 값으로 반올림됐을 값들도 서로 구분돼요.

```typescript
import { min } from 'es-toolkit/bigint';

// `number`로는 두 값 모두 9007199254740992예요
console.log(min([9007199254740993n, 9007199254740992n])); // 9007199254740992n
```

`BigInt`에는 `NaN`도 `Infinity`도 없어서 "최솟값이 없다"를 뜻하는 `BigInt`가 없기 때문에, 빈 배열은 대체 값을 반환하는 대신 에러를 던져요.

```typescript
import { min } from 'es-toolkit/bigint';

min([]); // RangeError: Cannot find the minimum of an empty array.
```

#### 파라미터

- `nums` (`readonly bigint[]`): 탐색할 `BigInt` 배열이에요.

#### 반환 값

(`bigint`): 배열에서 가장 작은 `BigInt`를 반환해요.

#### 에러

배열이 비어 있으면 `RangeError`를 던져요.
