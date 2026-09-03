# lerp

두 숫자 `start`, `stop` 사이에 `fraction` 위치에 있는 값을 계산해요. 선형 보간법(Linear interpolation)을 사용해요.

```typescript
const result = lerp(start, stop, fraction);
```

## 사용법

### `lerp(start, stop, fraction)`

`start`부터 `stop`까지를 하나의 구간으로 보고, 그 구간의 `fraction` 위치에 있는 값이 필요할 때 `lerp`를 사용하세요. `fraction`이 `0`이면 `start`, `1`이면 `stop`, `0.5`면 두 숫자의 한가운데 값을 반환해요. 애니메이션의 중간 값을 구하거나, `0`부터 `1` 사이의 진행률을 실제 값으로 바꿀 때 유용해요.

```typescript
import { lerp } from 'es-toolkit/math';

// 0과 100의 한가운데 값
lerp(0, 100, 0.5);
// Returns: 50

// 10부터 20까지 구간의 4분의 1 위치에 있는 값
lerp(10, 20, 0.25);
// Returns: 12.5

// fraction이 0이면 start, 1이면 stop을 반환해요
lerp(0, 100, 0);
// Returns: 0
lerp(0, 100, 1);
// Returns: 100

// start가 stop보다 커도 돼요
lerp(100, 0, 0.25);
// Returns: 75
```

`fraction`이 `0`보다 작거나 `1`보다 크면, 결과도 `start`와 `stop` 사이를 벗어난 값이 돼요. 범위 안의 값만 필요하다면 먼저 `fraction`에 `clamp`를 적용하세요.

```typescript
import { clamp, lerp } from 'es-toolkit/math';

// stop보다 큰 값이 나와요
lerp(0, 100, 1.5);
// Returns: 150

// fraction을 0과 1 사이로 제한하면 결과도 start와 stop 사이에 머물러요
lerp(0, 100, clamp(1.5, 0, 1));
// Returns: 100
```

`inverseLerp`와 함께 쓰면 한 범위의 숫자를 다른 범위로 옮길 수 있어요.

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

- `start` (`number`): 구간의 시작 값이에요. `fraction`이 `0`일 때 이 값을 반환해요.
- `stop` (`number`): 구간의 끝 값이에요. `fraction`이 `1`일 때 이 값을 반환해요.
- `fraction` (`number`): 시작과 끝 사이의 위치를 나타낸 보간 비율이에요. 보통 `0`과 `1` 사이의 값을 사용해요.

#### 반환 값

(`number`): 두 숫자 `start`, `stop` 사이에 `fraction` 위치에 있는 값을 반환해요.
