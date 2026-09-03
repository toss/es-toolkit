# lerp

두 숫자 사이를 선형으로 보간해요.

`lerp`는 "linear interpolation(선형 보간)"의 줄임말이에요. 한 숫자에서 다른 숫자로 가는 길의 특정 비율 지점에 있는 숫자를 반환해요.

```typescript
const result = lerp(a, b, t);
```

## 사용법

### `lerp(a, b, t)`

`a`에서 `b`로 가는 길의 `t` 비율 지점에 있는 숫자가 필요할 때 `lerp`를 사용하세요. `t`가 `0`이면 `a`, `1`이면 `b`, `0.5`면 두 값의 중간을 반환해요. 애니메이션, 진행률 표시, `0`부터 `1` 사이의 값을 특정 범위로 옮길 때 유용해요.

```typescript
import { lerp } from 'es-toolkit/math';

// 0과 100의 중간
lerp(0, 100, 0.5);
// Returns: 50

// 10에서 20으로 가는 길의 4분의 1 지점
lerp(10, 20, 0.25);
// Returns: 12.5

// t가 0이면 a, 1이면 b를 반환해요
lerp(0, 100, 0);
// Returns: 0
lerp(0, 100, 1);
// Returns: 100

// a가 b보다 커도 돼요
lerp(100, 0, 0.25);
// Returns: 75
```

결과는 범위 안으로 제한되지 않아요. `t`가 `0`보다 작거나 `1`보다 크면 같은 직선을 따라 범위 밖으로 확장된 값을 반환해요. 범위 안에 머물러야 한다면 먼저 `t`에 `clamp`를 적용하세요.

```typescript
import { clamp, lerp } from 'es-toolkit/math';

// b를 넘어서 확장돼요
lerp(0, 100, 1.5);
// Returns: 150

// t를 제한해서 결과를 [a, b] 안에 유지해요
lerp(0, 100, clamp(1.5, 0, 1));
// Returns: 100
```

`lerp`는 `inverseLerp`의 역함수예요. 둘을 함께 쓰면 한 범위의 숫자를 다른 범위로 옮길 수 있어요.

```typescript
import { inverseLerp, lerp } from 'es-toolkit/math';

// 0.25를 [0, 1]에서 [10, 20]으로 옮겨요
lerp(10, 20, 0.25);
// Returns: 12.5

// 150을 [100, 200]에서 [0, 1000]으로 옮겨요
lerp(0, 1000, inverseLerp(100, 200, 150));
// Returns: 500
```

#### 파라미터

- `a` (`number`): 시작 값이에요. `t`가 `0`일 때 반환돼요.
- `b` (`number`): 끝 값이에요. `t`가 `1`일 때 반환돼요.
- `t` (`number`): 보간 비율이에요. 보통 `0`과 `1` 사이의 값을 사용해요.

#### 반환 값

(`number`): 보간된 숫자를 반환해요.
