# pipe

값을 함수들의 연속을 통과시키면서, 왼쪽에서 오른쪽으로 함수를 합성해요.

```typescript
const result = pipe(value, ...functions);
```

## 사용법

`pipe`는 `es-toolkit/fp`의 진입점이에요. 초기 `value`를 받아서 각 함수를 순서대로 적용하고, 한 함수의 결과를 다음 함수의 입력으로 넘겨요. 변환이 실행되는 순서 그대로 위에서 아래로 읽혀서, 중첩과 임시 변수를 없애줘요.

`es-toolkit/fp`의 모든 연산자는 데이터를 마지막에 받기 때문에, `pipe` 안에 곧바로 끼워 넣을 수 있어요.

```typescript
import { map, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3],
  map(x => x * 3)
); // => [3, 6, 9]
```

es-toolkit 연산자뿐만 아니라, 인자를 하나 받는 어떤 함수든 `pipe` 안에서 동작해요.

```typescript
import { pipe } from 'es-toolkit/fp';

pipe(
  '  Hello  ',
  s => s.trim(),
  s => s.toLowerCase()
); // => 'hello'
```

### 지연 평가

지연 평가가 가능한 연산자(`map`, `filter`, `take`, …)가 연속해서 나타나면, `pipe`는 이들을 합쳐서 매 단계마다 중간 배열을 만드는 대신 입력을 하나씩 처리해요. 뒤에 오는 `take`가 순회를 일찍 끝낼 수 있어서, 앞쪽 연산자는 나머지 입력에 대해 절대 실행되지 않아요.

```typescript
import { filter, map, pipe, take } from 'es-toolkit/fp';

// 짝수 제곱 처음 두 개만 계산해요. 배열의 나머지는 한 번도 방문하지 않아요.
pipe(
  [1, 2, 3, 4, 5, 6, 7, 8],
  map(x => x * x),
  filter(x => x % 2 === 0),
  take(2)
); // => [4, 16]
```

::: tip
지연 평가가 진행되는 동안, 콜백의 세 번째 인자(데이터 배열)에는 전체 입력이 아니라 지금까지 처리된 요소들만 들어 있어요. 전체 배열이 필요하다면, 파이프 전에 변환하거나 지연 평가가 아닌 단계를 사용하세요.
:::

#### 파라미터

- `value` (`T`): 파이프라인에 처음 들어가는 초기 값이에요.
- `functions` (`Array<(input: any) => any>`): 왼쪽에서 오른쪽으로 적용할 함수들이에요. 각 함수는 이전 함수의 결과를 받아요.

#### 반환 값

(`unknown`): 모든 함수를 `value`에 순서대로 적용한 결과예요. 공개된 오버로드는 체인으로부터 정확한 타입을 추론해요.
