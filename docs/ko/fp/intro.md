# es-toolkit/fp

`es-toolkit/fp`는 es-toolkit의 함수형 프로그래밍 진입점이에요. 호출을 중첩하거나 임시 변수를 이리저리 다루는 대신, 데이터 변환을 [`pipe`](./reference/pipe.md)로 위에서 아래로 읽히는 파이프라인으로 표현할 수 있어요.

```typescript
import { filter, map, pipe, take } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 4, 5, 6],
  filter(x => x % 2 === 0),
  map(x => x * 10),
  take(2)
); // => [20, 40]
```

## 왜 es-toolkit/fp인가요

- **읽기 쉬워요** — 단계가 실행되는 순서 그대로 위에서 아래로 읽혀요. `take(map(filter(xs)))`를 안쪽부터 풀어 읽거나, 단계 사이에 임시 변수를 둘 필요가 없어요.
- **빨라요** — 연속된 단계를 하나의 순회로 합쳐서 중간 배열을 만들지 않고, 결과가 충분히 모이면 순회를 즉시 멈춰요. 어떻게 가능한지는 아래 [지연 평가](#지연-평가)에서 직접 볼 수 있어요.
- **손해는 없어요** — 합치는 게 이득이 없을 때는 네이티브 배열 메서드로 그대로 실행돼요. `xs.filter().map()`보다 느려질 일은 없고, 종종 훨씬 빨라질 뿐이에요.

## es-toolkit/fp 함수가 동작하는 방식

모든 `es-toolkit/fp` 함수는 설정값과 함께 호출되고(예를 들어 `map(fn)`이나 `take(2)`처럼), 데이터를 받는 함수를 반환해요. `pipe`가 그 데이터를 넘겨주면서, 각 단계의 결과를 다음 단계로 이어줘요.

```typescript
import { map, pipe } from 'es-toolkit/fp';

const triple = map((x: number) => x * 3); // (array) => number[]

pipe([1, 2, 3], triple); // => [3, 6, 9]
```

각 단계가 이렇게 "데이터를 기다리는 함수"라서, `pipe`는 실행을 시작하기 전에 파이프라인의 전체 모양을 알 수 있어요. 이게 지연 평가의 출발점이에요.

## 지연 평가

앞에서 "빠르다"고 한 비결이 지연 평가예요. 지연 평가가 가능한 함수들(`map`, `filter`, `take`, …)이 연달아 나오면, `pipe`는 이들을 하나의 순회로 합쳐요. 배열 전체가 단계를 하나씩 차례로 통과하는 대신, 요소 하나가 모든 단계를 한 번에 통과해요. 그래서 단계 사이에 중간 배열이 생기지 않고, 마지막 `take`가 채워지는 순간 순회 전체가 멈춰요.

아래 두 패널은 **같은 파이프라인**을 실행해요. **Eager**는 단계마다 배열 전체를 처리하면서 매번 새 배열을 만들어요. **Lazy fusion**은 요소 하나씩 끝까지 통과시키다가 `take(2)`가 채워지면 바로 멈춰요 — `5`와 `6`은 한 번도 방문하지 않고, 중간 배열도 없어요.

<FpLazySimulation />

입력이 클수록, 그리고 `take`가 일찍 채워질수록 이 차이는 커져요. 배열 전체를 훑는 것과 앞부분만 훑는 것의 차이거든요:

```typescript
import { filter, map, pipe, take } from 'es-toolkit/fp';

pipe(
  hugeArray,
  map(expensiveTransform),
  filter(complexPredicate),
  // 결과가 2개 모이는 즉시 멈춰요. `hugeArray`의 대부분은 한 번도 방문하지 않아요.
  take(2)
);
```

## es-toolkit과의 관계

`es-toolkit/fp`는 `es-toolkit`의 구현을 그대로 재사용해요. 달라지는 건 호출 방식뿐이에요 — `pipe` 안에서 호출하는 거죠. 직접 호출하는 방식을 선호한다면 [`es-toolkit`](/ko/intro)을 사용하세요. 마이그레이션하면서 Lodash 호출부와 맞추고 싶다면 [`es-toolkit/compat`](/ko/compat/intro)을 사용하세요.
