# range (`Iterator`용)

고정된 간격으로 숫자 시퀀스를 지연 평가 방식으로 내보내요.

```typescript
const numbers = range(end);
const numbers = range(start, end);
const numbers = range(start, end, step);
```

## 사용법

### `range(end)` / `range(start, end)` / `range(start, end, step)`

배열을 할당하지 않고 숫자 시퀀스를 만들 때 `range`를 사용하세요. 인자가 하나면 `0`부터 `end` 직전까지(미포함) `1`씩 세요. 인자가 둘이면 `start`부터(포함) 시작해요. 세 번째 인자는 간격을 정하고, 음수로 지정하면 감소하는 방향으로 셀 수 있어요. `es-toolkit/math`의 배열 버전 [`range`](../../reference/math/range.md)와 달리, 이터레이터가 소비되기 전에는 어떤 숫자도 계산되지 않아서 `range(0, Infinity)`로 끝없는 카운터를 실용적으로 만들 수 있어요.

```typescript
import { range } from 'es-toolkit/iterator';

// 0부터 끝까지(미포함) 세요.
range(4).toArray();
// 반환 값: [0, 1, 2, 3]

// 시작과 끝.
range(1, 4).toArray();
// 반환 값: [1, 2, 3]

// 간격을 직접 지정해요. 음수 간격도 가능해요.
range(0, 20, 5).toArray();
// 반환 값: [0, 5, 10, 15]
range(0, -4, -1).toArray();
// 반환 값: [0, -1, -2, -3]

// 끝없는 카운터를 take로 제한해요.
range(0, Infinity).take(3).toArray();
// 반환 값: [0, 1, 2]
```

#### 파라미터

- `start` (`number`): 범위의 시작 숫자예요(포함). 인자를 하나만 주면 기본값은 `0`이에요.
- `end` (`number`): 범위의 끝 숫자예요(미포함).
- `step` (`number`, 선택): 숫자 사이의 간격이에요. 0이 아닌 정수여야 해요. 기본값은 `1`이에요.

#### 반환 값

(`IteratorObject<number, undefined>`): 범위 안의 숫자들을 내보내는 지연 평가 이터레이터예요. 모든 네이티브 이터레이터 헬퍼(`map`, `take`, `toArray`, ...)를 갖추고 있어서 이어서 체이닝할 수 있어요.

#### 에러

`step`이 0이 아닌 정수가 아니면 에러를 던져요.
