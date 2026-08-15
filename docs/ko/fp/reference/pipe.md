# pipe (함수형 프로그래밍)

왼쪽에서 오른쪽으로 함수를 합성하면서, 값을 일련의 함수에 차례로 흘려보내요.

```typescript
const result = pipe(value, ...functions);
```

::: info

`pipe`는 `es-toolkit/fp`에서 조합을 시작하는 진입점이에요. 값을 왼쪽에서 오른쪽으로 여러 변환에 통과시키고 싶을 때 사용하세요.

:::

## 사용법

`pipe`는 `es-toolkit/fp`의 진입점이에요. 초기 `value`를 받아서 각 함수를 순서대로 적용하는데, 한 함수의 결과를 다음 함수의 입력으로 넘겨줘요. 변환이 실행되는 순서 그대로 위에서 아래로 읽혀서, 중첩과 임시 변수를 없앨 수 있어요.

모든 `es-toolkit/fp` 함수는 데이터를 받는 함수를 반환하기 때문에, `pipe` 안에 바로 끼워 넣을 수 있어요.

```typescript
import { map, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3],
  map(x => x * 3)
); // => [3, 6, 9]
```

es-toolkit 함수뿐만 아니라 인자를 하나 받는 함수라면 무엇이든 `pipe` 안에서 동작해요.

```typescript
import { pipe } from 'es-toolkit/fp';

pipe(
  '  Hello  ',
  s => s.trim(),
  s => s.toLowerCase()
); // => 'hello'
```

### 지연 평가

지연 평가가 가능한 함수들(`map`, `filter`, `take`, …)이 연달아 나오면, `pipe`는 이들을 합쳐서 매 단계마다 중간 배열을 만드는 대신 입력을 요소 하나씩 처리해요. 마지막에 오는 `take`가 순회를 일찍 끝낼 수 있어서, 앞쪽 함수들은 나머지 입력에 대해서는 아예 실행되지 않아요.

```typescript
import { filter, map, pipe, take } from 'es-toolkit/fp';

// 처음 두 개의 짝수 제곱만 계산해요. 배열의 나머지는 한 번도 방문하지 않아요.
pipe(
  [1, 2, 3, 4, 5, 6, 7, 8],
  map(x => x * x),
  filter(x => x % 2 === 0),
  take(2)
); // => [4, 16]
```

#### 파라미터

- `value` (`T`): 파이프라인에 처음 넣을 값이에요.
- `functions` (`Array<(input: any) => any>`): 왼쪽에서 오른쪽으로 적용할 함수들이에요. 각 함수는 이전 함수의 출력을 받아요.

#### 반환 값

(`unknown`): 모든 함수를 `value`에 차례로 적용한 결과예요. 공개된 오버로드는 체인에서 정확한 타입을 추론해요.
