# rangeRight (`BigInt`)

[range](./range.md)와 같은 `BigInt`들을 내림차순으로 반환해요.

```typescript
const numbers = rangeRight(end);
const numbers = rangeRight(start, end);
const numbers = rangeRight(start, end, step);
```

::: info

이 함수는 다른 숫자 타입의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/bigint`에서만 사용할 수 있어요.

:::

## 사용법

### `rangeRight(end)`

끝 값 바로 아래부터 `0n`까지 거꾸로 세고 싶을 때 `rangeRight`에 인자를 하나 넘겨서 사용하세요.

```typescript
import { rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(4n)); // [3n, 2n, 1n, 0n]
console.log(rangeRight(0n)); // []
```

#### 파라미터

- `end` (`bigint`): 범위의 끝이에요. 포함되지 않아요.

#### 반환 값

(`bigint[]`): `end` 바로 아래부터 `0n`까지의 `BigInt` 배열을 반환해요.

### `rangeRight(start, end)`

`0n`이 아닌 시작 값까지 거꾸로 세고 싶을 때 `rangeRight`에 인자를 두 개 넘겨서 사용하세요.

```typescript
import { rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(2n, 5n)); // [4n, 3n, 2n]
console.log(rangeRight(-3n, 0n)); // [-1n, -2n, -3n]
```

#### 파라미터

- `start` (`bigint`): 범위의 시작이에요. 포함돼요.
- `end` (`bigint`): 범위의 끝이에요. 포함되지 않아요.

#### 반환 값

(`bigint[]`): `end` 바로 아래부터 `start`까지의 `BigInt` 배열을 반환해요.

### `rangeRight(start, end, step)`

`1n`이 아닌 간격으로 세고 싶을 때 `rangeRight`에 인자를 세 개 넘겨서 사용하세요. 같은 인자로 `range`를 호출한 결과를 그대로 뒤집은 값이에요.

```typescript
import { range, rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(0n, 10n, 2n)); // [8n, 6n, 4n, 2n, 0n]
console.log(rangeRight(5n, 0n, -1n)); // [1n, 2n, 3n, 4n, 5n]

// 항상 같은 인자로 호출한 range의 역순이에요
console.log(rangeRight(0n, 10n, 3n)); // [9n, 6n, 3n, 0n]
console.log(range(0n, 10n, 3n)); // [0n, 3n, 6n, 9n]
```

간격이 끝 값에서 멀어지는 방향이면 만들 수 있는 값이 없어서 빈 배열이 반환돼요.

```typescript
import { rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(0n, 5n, -1n)); // []
```

#### 파라미터

- `start` (`bigint`): 범위의 시작이에요. 포함돼요.
- `end` (`bigint`): 범위의 끝이에요. 포함되지 않아요.
- `step` (`bigint`, 선택): 세어 나갈 간격이에요. 기본값은 `1n`이에요.

#### 반환 값

(`bigint[]`): `range(start, end, step)`의 값들을 내림차순으로 반환해요.

#### 에러

`step`이 `0n`이면 에러를 던져요.
