# clamp (`BigInt`)

`BigInt`를 주어진 범위로 제한해요.

```typescript
const clamped = clamp(value, maximum);
const clamped = clamp(value, minimum, maximum);
```

::: info

이 함수는 다른 숫자 타입의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/bigint`에서만 사용할 수 있어요.

:::

## 사용법

### `clamp(value, maximum)`

최댓값만 제한하고 싶을 때 `clamp`에 인자를 두 개 넘겨서 사용하세요. 최댓값보다 큰 값은 최댓값으로 돌아오고, 나머지는 그대로 반환돼요.

```typescript
import { clamp } from 'es-toolkit/bigint';

console.log(clamp(10n, 5n)); // 5n, 10n이 최댓값보다 크기 때문이에요
console.log(clamp(3n, 5n)); // 3n, 이미 범위 안에 있어요
```

#### 파라미터

- `value` (`bigint`): 제한할 `BigInt`예요.
- `maximum` (`bigint`): 범위의 최댓값(포함)이에요.

#### 반환 값

(`bigint`): 최댓값을 넘지 않도록 제한된 `BigInt`를 반환해요.

### `clamp(value, minimum, maximum)`

최솟값과 최댓값을 모두 제한하고 싶을 때 `clamp`에 인자를 세 개 넘겨서 사용하세요. `Math.min`과 `Math.max`는 `BigInt`를 받을 수 없기 때문에, 이 함수를 사용해야 해요.

```typescript
import { clamp } from 'es-toolkit/bigint';

console.log(clamp(10n, 0n, 5n)); // 5n, 최댓값보다 커요
console.log(clamp(-10n, 0n, 5n)); // 0n, 최솟값보다 작아요
console.log(clamp(3n, 0n, 5n)); // 3n, 이미 범위 안에 있어요

// 최솟값과 최댓값은 모두 포함돼요
console.log(clamp(0n, 0n, 5n)); // 0n
console.log(clamp(5n, 0n, 5n)); // 5n

// 음수 범위에서도 사용할 수 있어요
console.log(clamp(-10n, -5n, -1n)); // -5n
```

`BigInt`는 정확하게 비교되기 때문에, `Number.MAX_SAFE_INTEGER`를 훨씬 넘어서는 경계값도 기대한 대로 동작해요.

```typescript
import { clamp } from 'es-toolkit/bigint';

const maxUint64 = 18446744073709551615n;
console.log(clamp(20000000000000000000n, 0n, maxUint64)); // 18446744073709551615n
```

#### 파라미터

- `value` (`bigint`): 제한할 `BigInt`예요.
- `minimum` (`bigint`): 범위의 최솟값(포함)이에요.
- `maximum` (`bigint`): 범위의 최댓값(포함)이에요.

#### 반환 값

(`bigint`): 범위 안으로 제한된 `BigInt`를 반환해요.
