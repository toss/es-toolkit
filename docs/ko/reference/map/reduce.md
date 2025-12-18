# reduce (`Map`)

Map의 항목을 순회하며 콜백 함수를 적용하여 하나의 값으로 줄여요.

```typescript
const result = reduce(map, callback, initialValue);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/map`에서만 사용할 수 있어요.

:::

## 사용법

### `reduce(map, callback, initialValue?)`

Map의 각 항목에서 결과를 누적하여 하나의 값으로 변환하고 싶을 때 `reduce`를 사용하세요. 각 항목을 처리하고 누산기를 업데이트하는 콜백 함수를 제공하세요. 초기값이 제공되면 누산기의 시작값으로 사용돼요. 초기값이 제공되지 않고 Map이 비어있으면 TypeError가 발생해요.

```typescript
import { reduce } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = reduce(map, (acc, value) => acc + value, 0);
// 결과: 6
```

다양한 방법으로 Map을 줄일 수 있어요.

```typescript
import { reduce } from 'es-toolkit/map';

// 초기값과 함께 합계 계산해요.
const scores = new Map([
  ['alice', 95],
  ['bob', 87],
  ['charlie', 92],
]);

const totalScore = reduce(scores, (acc, score) => acc + score, 0);
// 결과: 274

// 초기값 없이 (첫 번째 값 사용)
const numbers = new Map([
  ['a', 10],
  ['b', 20],
]);

const sum = reduce(numbers, (acc, value) => acc + value);
// 결과: 30 (첫 번째 값 10부터 시작)

// Map에서 객체 만들기
const settings = new Map([
  ['theme', 'dark'],
  ['lang', 'en'],
  ['notifications', true],
]);

const config = reduce(
  settings,
  (acc, value, key) => ({ ...acc, [key]: value }),
  {} as Record<string, any>
);
// 결과: { theme: 'dark', lang: 'en', notifications: true }
```

#### 파라미터

- `map` (`Map<K, V>`): 줄일 Map이에요.
- `callback` (`(accumulator: A, value: V, key: K, map: Map<K, V>) => A`): 각 항목을 처리하고 누산기를 업데이트하는 함수예요.
- `initialValue` (`A`, 선택): 누산기의 초기값이에요. 제공되지 않으면 Map의 첫 번째 값을 사용해요.

#### 반환 값

(`A`): 최종 누적된 값을 반환해요.

#### 예외

(`TypeError`): Map이 비어있고 초기값이 제공되지 않으면 발생해요.
