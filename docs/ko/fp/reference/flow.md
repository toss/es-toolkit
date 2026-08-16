# flow (함수형 프로그래밍)

왼쪽에서 오른쪽으로 함수를 합성하되, 바로 실행하지 않고 재사용할 수 있는 함수를 반환해요.

```typescript
const fn = flow(...functions);
const result = fn(...args);
```

::: info

`flow`는 [`pipe`](./pipe.md)의 지연 실행 버전이에요. 파이프라인을 한 번 만들어 두고 나중에 다른 데이터로 여러 번 호출하고 싶을 때는 `flow`를, 이미 값을 가지고 있어서 결과를 바로 얻고 싶을 때는 `pipe`를 사용하세요.

:::

## 사용법

`flow`는 여러 함수를 받아서 왼쪽에서 오른쪽으로 하나의 함수로 합성해요. 첫 번째 함수는 인자를 몇 개든 받을 수 있고, 그 뒤의 함수들은 모두 인자를 하나 받아서 이전 함수의 결과를 넘겨받아요.

`pipe`와의 핵심 차이는 이래요.

- `pipe(value, ...functions)`는 구체적인 `value`를 함수들에 **즉시** 흘려보내고 결과를 반환해요.
- `flow(...functions)`는 같은 합성을 호출할 때마다 적용하는 **새로운 함수**를 반환해서, 재사용할 수 있어요.

```typescript
import { flow } from 'es-toolkit/fp';

const addThenSquare = flow(
  (x: number, y: number) => x + y,
  n => n * n
);

addThenSquare(1, 2); // => 9
addThenSquare(2, 3); // => 25
```

`flow`는 내부적으로 `pipe`에 위임하기 때문에, 모든 `es-toolkit/fp` 함수(또는 인자를 하나 받는 함수)를 똑같이 끼워 넣을 수 있고, 지연 평가가 가능한 함수들도 동일하게 합쳐져요.

```typescript
import { filter, flow, map, take } from 'es-toolkit/fp';

const firstTwoEvenSquares = flow(
  map((x: number) => x * x),
  filter(x => x % 2 === 0),
  take(2)
);

firstTwoEvenSquares([1, 2, 3, 4, 5, 6, 7, 8]); // => [4, 16]
```

### 지연 평가

`flow`는 `pipe`를 통해 실행되기 때문에, 지연 평가가 가능한 함수들(`map`, `filter`, `take`, …)이 연달아 나오면 이들을 합쳐서 매 단계마다 중간 배열을 만드는 대신 입력을 요소 하나씩 처리해요. 마지막에 오는 `take`가 순회를 일찍 끝낼 수 있어서, 앞쪽 함수들은 나머지 입력에 대해서는 아예 실행되지 않아요. `pipe`와 똑같이 동작해요.

```typescript
import { filter, flow, map, take } from 'es-toolkit/fp';

// 처음 두 개의 짝수 제곱만 계산해요. 배열의 나머지는 한 번도 방문하지 않아요.
const pipeline = flow(
  map((x: number) => x * x),
  filter(x => x % 2 === 0),
  take(2)
);

pipeline([1, 2, 3, 4, 5, 6, 7, 8]); // => [4, 16]
```

#### 파라미터

- `functions` (`Array<(...args: any[]) => any>`): 왼쪽에서 오른쪽으로 합성할 함수들이에요. 첫 번째 함수는 인자를 몇 개든 받을 수 있고, 나머지는 모두 인자를 하나 받아서 이전 함수의 출력을 넘겨받아요.

#### 반환 값

(`(...args: any[]) => unknown`): 모든 함수를 순서대로 적용하는 새로운 함수예요. 첫 번째 함수와 같은 파라미터를 받아서 마지막 함수의 결과를 반환해요. 공개된 오버로드는 체인에서 정확한 타입을 추론해요.
