# inverseLerp

숫자 `value`가 두 숫자 `start`, `stop` 사이의 어느 위치에 있는지 `0`부터 `1` 사이의 비율로 계산해요. `lerp`의 반대 연산이에요.

```typescript
const fraction = inverseLerp(start, stop, value);
```

## 사용법

### `inverseLerp(start, stop, value)`

`start`부터 `stop`까지를 하나의 구간으로 보고, `value`가 그 구간의 어디쯤 있는지 알고 싶을 때 `inverseLerp`를 사용하세요. `value`가 `start`면 `0`, `stop`이면 `1`, 한가운데면 `0.5`를 반환해요. 스크롤 위치나 슬라이더 값을 `0`부터 `1` 사이의 진행률로 바꿀 때 유용해요.

```typescript
import { inverseLerp } from 'es-toolkit/math';

// 50은 0과 100의 한가운데에 있어요
inverseLerp(0, 100, 50);
// Returns: 0.5

// 12.5는 10부터 20까지 구간의 4분의 1 위치에 있어요
inverseLerp(10, 20, 12.5);
// Returns: 0.25

// value가 start면 0, stop이면 1을 반환해요
inverseLerp(0, 100, 0);
// Returns: 0
inverseLerp(0, 100, 100);
// Returns: 1

// start가 stop보다 커도 돼요
inverseLerp(100, 0, 75);
// Returns: 0.25
```

`value`가 `start`와 `stop` 사이를 벗어나면 결과도 `0`보다 작거나 `1`보다 큰 값이 돼요. `0`과 `1` 사이의 값만 필요하다면 결과에 `clamp`를 적용하세요.

```typescript
import { clamp, inverseLerp } from 'es-toolkit/math';

// stop보다 큰 값을 넣으면 1보다 큰 비율이 나와요
inverseLerp(0, 100, 150);
// Returns: 1.5

// 결과를 0과 1 사이로 제한해요
clamp(inverseLerp(0, 100, 150), 0, 1);
// Returns: 1
```

`start`와 `stop`이 같은 숫자면 위치를 잴 구간이 없으므로 `0`을 반환해요.

```typescript
import { inverseLerp } from 'es-toolkit/math';

// 구간의 길이가 0이에요
inverseLerp(5, 5, 5);
// Returns: 0
```

`lerp`와 함께 쓰면 한 범위의 숫자를 다른 범위로 옮길 수 있어요.

```typescript
import { inverseLerp, lerp } from 'es-toolkit/math';

// 150을 [100, 200]에서 [0, 1000]으로 옮겨요
lerp(0, 1000, inverseLerp(100, 200, 150));
// Returns: 500
```

#### 파라미터

- `start` (`number`): 구간의 시작 값이에요. `value`가 이 값이면 `0`을 반환해요.
- `stop` (`number`): 구간의 끝 값이에요. `value`가 이 값이면 `1`을 반환해요.
- `value` (`number`): 구간 안에서 위치를 찾을 숫자예요.

#### 반환 값

(`number`): `value`가 `start`와 `stop` 사이의 어느 위치에 있는지 `0`부터 `1` 사이의 비율로 반환해요.
