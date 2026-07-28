# range (`BigInt`)

시작 값부터 끝 값 직전까지 세어 나가는 `BigInt` 배열을 반환해요.

```typescript
const numbers = range(end);
const numbers = range(start, end);
const numbers = range(start, end, step);
```

::: info

이 함수는 다른 숫자 타입의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/bigint`에서만 사용할 수 있어요.

:::

## 사용법

### `range(end)`

`0n`부터 끝 값 직전까지 세고 싶을 때 `range`에 인자를 하나 넘겨서 사용하세요.

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(4n)); // [0n, 1n, 2n, 3n]
console.log(range(0n)); // []
```

#### 파라미터

- `end` (`bigint`): 범위의 끝이에요. 포함되지 않아요.

#### 반환 값

(`bigint[]`): `0n`부터 `end` 직전까지의 `BigInt` 배열을 반환해요.

### `range(start, end)`

`0n` 대신 원하는 시작 값부터 세고 싶을 때 `range`에 인자를 두 개 넘겨서 사용하세요.

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(2n, 5n)); // [2n, 3n, 4n]
console.log(range(-3n, 0n)); // [-3n, -2n, -1n]

// 시작 값과 끝 값이 같으면 셀 것이 없어요
console.log(range(3n, 3n)); // []
```

`BigInt`는 값이 아무리 커져도 정확하기 때문에, `Number.MAX_SAFE_INTEGER`를 넘어서는 범위도 값이 조용히 겹치는 일 없이 만들 수 있어요.

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(9007199254740993n, 9007199254740996n));
// [9007199254740993n, 9007199254740994n, 9007199254740995n]
```

#### 파라미터

- `start` (`bigint`): 범위의 시작이에요. 포함돼요.
- `end` (`bigint`): 범위의 끝이에요. 포함되지 않아요.

#### 반환 값

(`bigint[]`): `start`부터 `end` 직전까지의 `BigInt` 배열을 반환해요.

### `range(start, end, step)`

`1n`이 아닌 간격으로 세고 싶을 때 `range`에 인자를 세 개 넘겨서 사용하세요. 간격이 음수면 값이 줄어들어요.

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(0n, 10n, 2n)); // [0n, 2n, 4n, 6n, 8n]
console.log(range(5n, 0n, -1n)); // [5n, 4n, 3n, 2n, 1n]
console.log(range(5n, 0n, -2n)); // [5n, 3n, 1n]
```

간격이 끝 값에서 멀어지는 방향이면 만들 수 있는 값이 없어서 빈 배열이 반환돼요.

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(0n, 5n, -1n)); // []
console.log(range(5n, 0n, 1n)); // []
```

#### 파라미터

- `start` (`bigint`): 범위의 시작이에요. 포함돼요.
- `end` (`bigint`): 범위의 끝이에요. 포함되지 않아요.
- `step` (`bigint`, 선택): 세어 나갈 간격이에요. 기본값은 `1n`이에요.

#### 반환 값

(`bigint[]`): `start`부터 `end` 직전까지 `step` 간격으로 센 `BigInt` 배열을 반환해요.

#### 에러

`step`이 `0n`이면 에러를 던져요.
