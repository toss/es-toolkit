# inverseLerp

숫자가 두 숫자 사이의 어느 지점에 있는지 `0`부터 `1` 사이의 비율로 계산해요.

`lerp`의 역함수이고, 숫자를 범위에 맞춰 정규화하는 것과 같아요.

```typescript
const t = inverseLerp(a, b, value);
```

## 사용법

### `inverseLerp(a, b, value)`

숫자가 범위의 어디쯤 있는지 알고 싶을 때 `inverseLerp`를 사용하세요. `value`가 `a`면 `0`, `b`면 `1`, 두 값의 중간이면 `0.5`를 반환해요. 스크롤 위치, 슬라이더 값, 측정값을 진행률로 바꿀 때 유용해요.

```typescript
import { inverseLerp } from 'es-toolkit/math';

// 50은 0과 100의 중간이에요
inverseLerp(0, 100, 50);
// Returns: 0.5

// 12.5는 10에서 20으로 가는 길의 4분의 1 지점이에요
inverseLerp(10, 20, 12.5);
// Returns: 0.25

// value가 a면 0, b면 1을 반환해요
inverseLerp(0, 100, 0);
// Returns: 0
inverseLerp(0, 100, 100);
// Returns: 1

// a가 b보다 커도 돼요
inverseLerp(100, 0, 75);
// Returns: 0.25
```

결과는 `[0, 1]` 안으로 제한되지 않아요. `value`가 범위 밖에 있으면 `0`보다 작거나 `1`보다 큰 값을 반환해요. `[0, 1]` 안에 머물러야 한다면 결과에 `clamp`를 적용하세요.

```typescript
import { clamp, inverseLerp } from 'es-toolkit/math';

// 범위의 끝을 넘어섰어요
inverseLerp(0, 100, 150);
// Returns: 1.5

// 결과를 [0, 1]로 제한해요
clamp(inverseLerp(0, 100, 150), 0, 1);
// Returns: 1
```

`a`와 `b`가 같으면 의미 있는 비율이 없으므로, 0으로 나누는 대신 `0`을 반환해요.

```typescript
import { inverseLerp } from 'es-toolkit/math';

// 범위가 비어 있어요
inverseLerp(5, 5, 5);
// Returns: 0
```

`inverseLerp`는 `lerp`의 역함수예요. 둘을 함께 쓰면 한 범위의 숫자를 다른 범위로 옮길 수 있어요.

```typescript
import { inverseLerp, lerp } from 'es-toolkit/math';

// 150을 [100, 200]에서 [0, 1000]으로 옮겨요
lerp(0, 1000, inverseLerp(100, 200, 150));
// Returns: 500
```

#### 파라미터

- `a` (`number`): 범위의 시작이에요. `0`에 대응돼요.
- `b` (`number`): 범위의 끝이에요. `1`에 대응돼요.
- `value` (`number`): 범위 안에서 위치를 찾을 숫자예요.

#### 반환 값

(`number`): `value`가 `a`에서 `b`로 가는 길의 어느 비율 지점에 있는지 반환해요.
