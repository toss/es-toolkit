# inRange (`BigInt`)

`BigInt`가 범위 안에 있는지 확인해요.

```typescript
const result = inRange(value, maximum);
const result = inRange(value, minimum, maximum);
```

::: info

이 함수는 다른 숫자 타입의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/bigint`에서만 사용할 수 있어요.

:::

## 사용법

### `inRange(value, maximum)`

`0n`부터 최댓값 미만까지의 범위를 확인하고 싶을 때 `inRange`에 인자를 두 개 넘겨서 사용하세요. 최솟값은 자동으로 `0n`이 돼요.

```typescript
import { inRange } from 'es-toolkit/bigint';

console.log(inRange(3n, 5n)); // true, 0n <= 3n < 5n이기 때문이에요
console.log(inRange(5n, 5n)); // false, 최댓값은 포함되지 않기 때문이에요
console.log(inRange(-1n, 5n)); // false, -1n이 0n보다 작기 때문이에요
```

#### 파라미터

- `value` (`bigint`): 확인할 `BigInt`예요.
- `maximum` (`bigint`): 범위의 최댓값(미포함)이에요.

#### 반환 값

(`boolean`): `BigInt`가 `0n` 이상이고 최댓값 미만이면 `true`를, 그렇지 않으면 `false`를 반환해요.

#### 에러

최댓값이 `0n`보다 크지 않으면 에러를 던져요.

### `inRange(value, minimum, maximum)`

범위를 직접 지정해서 확인하고 싶을 때 `inRange`에 인자를 세 개 넘겨서 사용하세요. 최솟값은 포함되고, 최댓값은 포함되지 않아요.

```typescript
import { inRange } from 'es-toolkit/bigint';

console.log(inRange(5n, 0n, 10n)); // true
console.log(inRange(0n, 0n, 10n)); // true, 최솟값은 포함돼요
console.log(inRange(10n, 0n, 10n)); // false, 최댓값은 포함되지 않아요

// 음수 범위에서도 사용할 수 있어요
console.log(inRange(-3n, -5n, -1n)); // true
```

`BigInt` 비교는 값이 아무리 커져도 정확하기 때문에, 값을 저장하기 전에 정수 타입이나 데이터베이스 컬럼에 들어갈 수 있는지 확인할 때 유용해요.

```typescript
import { inRange } from 'es-toolkit/bigint';

// 부호 없는 64비트 컬럼에 들어갈 수 있을까요?
const maxUint64Exclusive = 18446744073709551616n;
console.log(inRange(18446744073709551615n, 0n, maxUint64Exclusive)); // true
console.log(inRange(18446744073709551616n, 0n, maxUint64Exclusive)); // false
```

#### 파라미터

- `value` (`bigint`): 확인할 `BigInt`예요.
- `minimum` (`bigint`): 범위의 최솟값(포함)이에요.
- `maximum` (`bigint`): 범위의 최댓값(미포함)이에요.

#### 반환 값

(`boolean`): `BigInt`가 범위 안에 있으면 `true`를, 그렇지 않으면 `false`를 반환해요.

#### 에러

최솟값이 최댓값보다 크거나 같으면 에러를 던져요.
