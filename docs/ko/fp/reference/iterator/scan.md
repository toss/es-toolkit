# scan (`Iterator`)

이터레이터의 요소를 차례로 누적하면서, 그때그때의 누적값을 지연 평가 방식으로 내보내는 함수를 만들어요. [`pipe`](../pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, scan(callback, initial));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 `es-toolkit/iterator`의 [`scan`](../../../reference/iterator/scan.md)을 쓰는 것이 좋아요: `scan(source, callback, initial)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `scan(callback, initial)`

`scan`은 콜백과 초기값을 받아서, `initial`을 먼저 내보내고 그 뒤로 각 요소를 처리한 뒤의 누적값을 내보내는 함수를 반환해요. 모든 중간 결과도 함께 내보내는 [`reduce`](./reduce.md)처럼 동작해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { scan, toArray } from 'es-toolkit/fp/iterator';

// 누적 합계를 내보내요.
pipe(
  [1, 2, 3].values(),
  scan((acc, x) => acc + x, 0),
  toArray()
);
// 반환 값: [0, 1, 3, 6]
```

#### 파라미터

- `callback` (`(accumulator: U, value: T, index: number) => U`): 현재 누적값, 각 요소, 인덱스로 호출돼요. 다음 누적값을 반환해요.
- `initial` (`U`): 누적을 시작할 값이에요. 첫 번째 값으로 내보내요.

#### 반환 값

(`(source: Iterator<T>) => IteratorObject<U, undefined>`): 이터레이터를, 초기값과 이어지는 각 누적값을 내보내는 지연 평가 이터레이터로 변환하는 함수예요.
