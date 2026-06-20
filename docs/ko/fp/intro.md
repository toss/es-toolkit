# es-toolkit/fp

`es-toolkit/fp`는 es-toolkit의 함수형 프로그래밍 진입점이에요. 호출을 중첩하거나 임시 변수를 여기저기 두는 대신, 데이터 변환을 [`pipe`](/ko/fp/reference/pipe)로 위에서 아래로 읽히는 파이프라인으로 표현할 수 있어요.

```typescript
import { filter, map, pipe, take } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 4, 5, 6],
  filter(x => x % 2 === 0),
  map(x => x * 10),
  take(2)
); // => [20, 40]
```

## 데이터를 마지막에 받는 연산자

`es-toolkit/fp`의 모든 연산자는 **데이터를 마지막에 받아요**. 설정값(예를 들면 `map(fn)`이나 `take(2)`)과 함께 호출하면, 데이터를 받을 함수가 반환돼요. `pipe`가 그 데이터를 공급하면서, 각 단계의 결과를 다음 단계로 이어줘요.

```typescript
import { map, pipe } from 'es-toolkit/fp';

const triple = map((x: number) => x * 3); // (array) => number[]

pipe([1, 2, 3], triple); // => [3, 6, 9]
```

## 지연 평가

지연 평가가 가능한 연산자(`map`, `filter`, `take`, …)가 연속해서 나타나면, `pipe`는 이들을 하나의 순회로 합쳐서 데이터를 한 번에 하나씩 처리해요. 그러면 뒤에 오는 `take`가 순회를 일찍 끝낼 수 있어서, 앞쪽 연산자는 나머지 입력에 대해 절대 실행되지 않아요.

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

지연 평가가 진행되는 동안, 콜백의 세 번째 인자(데이터 배열)에는 전체 입력이 아니라 지금까지 처리된 요소들만 들어 있어요.

## es-toolkit과의 관계

`es-toolkit/fp`는 `es-toolkit`의 구현을 그대로 재사용해요. 달라지는 건 호출하는 방식뿐이에요. 데이터를 마지막에 받고, `pipe` 안에서 사용해요. 직접 호출하는 방식을 선호한다면 [`es-toolkit`](/ko/intro)을 사용하세요. 마이그레이션하면서 Lodash 호출부와 맞추고 싶다면 [`es-toolkit/compat`](/ko/compat/intro)을 사용하세요.
