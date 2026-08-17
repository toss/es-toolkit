# es-toolkit/iterator

`es-toolkit/iterator`는 JavaScript 이터레이터를 위한 지연 평가 헬퍼를 제공해요. 매 단계마다 중간 배열을 만드는 대신, 이터레이터 파이프라인은 요소를 한 번에 하나씩 처리하고 실제로 소비되는 만큼만 작업을 수행해요.

```typescript
import { takeWhile } from 'es-toolkit/iterator';

takeWhile(hugeArray.values(), x => x < 100)
  .map(expensiveTransform) // 네이티브 이터레이터 헬퍼
  .toArray();
// `expensiveTransform`은 100보다 작은 앞쪽 요소들에 대해서만 실행돼요.
```

## es-toolkit/iterator 함수가 동작하는 방식

모든 함수는 첫 번째 인자로 `Iterator`를 받아요 — `array.values()`로 얻는 값, 제너레이터 함수, `Map`/`Set` 이터레이터 등이요. 지연 평가 함수는 프로토타입이 네이티브 `Iterator.prototype`인 `IteratorObject`를 반환하기 때문에, 결과는 모든 [네이티브 이터레이터 헬퍼](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)(`map`, `filter`, `take`, `drop`, `flatMap`, `reduce`, `toArray`, ...)를 갖추고 있고, 이들과 자연스럽게 이어서 체이닝할 수 있어요.

이 모듈은 네이티브 헬퍼에 없는 것만 제공해요. 개수 기반의 `take`와 `drop`, `map`, `filter` 등은 이미 `Iterator.prototype`에 있어요. es-toolkit은 그 위에 조건 기반 연산, 상태를 가지는 연산, 여러 소스를 다루는 연산을 더해요: [`chunk`](./reference/chunk.md), [`count`](./reference/count.md), [`dropWhile`](./reference/dropWhile.md), [`head`](./reference/head.md), [`iterate`](./reference/iterate.md), [`partition`](./reference/partition.md), [`range`](./reference/range.md), [`scan`](./reference/scan.md), [`takeWhile`](./reference/takeWhile.md), [`uniqBy`](./reference/uniqBy.md), [`zip`](./reference/zip.md)이에요.

## 지연 평가와 무한 시퀀스

어떤 요소도 요청되기 전에는 계산되지 않아요. 네이티브 `take`처럼 일찍 멈추는 헬퍼와 함께 쓰면, 무한 시퀀스도 실용적으로 다룰 수 있어요:

```typescript
import { iterate } from 'es-toolkit/iterator';

// 2의 거듭제곱을 필요할 때마다 생성해요.
iterate(1, x => x * 2)
  .take(5)
  .toArray(); // => [1, 2, 4, 8, 16]
```

## 한 번만 소비할 수 있는 동작 방식

모든 JavaScript 이터레이터처럼, 결과는 한 번만 소비할 수 있어요. 한 번 소비하고 나면 더 이상 아무것도 내보내지 않아요. 파이프라인이 일찍 멈추면 — `take` 제한에 도달하거나, `for...of` 루프가 `break`하거나, 콜백이 에러를 던지면 — 소스 이터레이터가 `return` 메서드를 통해 닫히기 때문에, 제너레이터 소스의 `try/finally` 정리 코드가 안정적으로 실행돼요.

```typescript
import { chunk } from 'es-toolkit/iterator';

function* lines() {
  const file = open('data.txt');
  try {
    yield* file.readLines();
  } finally {
    file.close(); // 소비자가 일찍 멈춰도 실행돼요.
  }
}

chunk(lines(), 100).take(2).toArray();
```

## pipe와 함께 사용하기

모든 연산은 [`pipe`](../fp/reference/pipe.md)와 함께 쓸 수 있도록 `es-toolkit/fp/iterator`에서 커링된 형태로도 제공돼요. 네이티브 헬퍼(`map`, `filter`, `take`, ...)를 pipe에 맞게 감싼 래퍼도 함께 제공돼요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, map, take, toArray } from 'es-toolkit/fp/iterator';

pipe(
  hugeArray.values(),
  filter(x => x % 2 === 0),
  map(x => x * 10),
  take(2),
  toArray()
); // => [20, 40]
```

## es-toolkit과의 관계

데이터가 이미 배열이고 전부 처리할 예정이라면 [`es-toolkit`](/ko/intro)의 배열 함수가 올바른 기본 선택이에요. 입력이 크거나 무한할 때, 파이프라인이 일찍 끝날 수 있을 때, 데이터가 이미 이터레이터나 제너레이터로 도착할 때 `es-toolkit/iterator`를 사용하세요.
