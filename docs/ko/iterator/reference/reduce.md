# reduce (`Iterator`용)

이터레이터를 하나의 값으로 접는 함수를 만들어요. [`pipe`](../../fp/reference/pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, reduce(callback, initial));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 네이티브 [`Iterator.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/reduce)를 쓰는 것이 좋아요: `source.reduce(callback, initial)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `reduce(callback, initial)`

`reduce`는 파이프라인을 끝내는 종결 단계예요. 모든 요소를 꺼내면서 누적값을 `callback`에 이어서 전달하고, 마지막 누적값을 반환해요. 이터레이터 전체를 소비하기 때문에, 무한 이터레이터에는 사용하면 안 돼요. 마지막 누적값만이 아니라 모든 중간 누적값을 유지하려면 [`scan`](./scan.md)을 사용하세요. 네이티브 `Iterator.prototype.reduce`에 위임해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, reduce } from 'es-toolkit/fp/iterator';

// 두 배로 만든 요소들의 합을 구해요.
pipe(
  [1, 2, 3].values(),
  map(x => x * 2),
  reduce((acc, x) => acc + x, 0)
);
// 반환 값: 12
```

#### 파라미터

- `callback` (`(accumulator: U, value: T, index: number) => U`): 현재 누적값, 각 요소, 인덱스로 호출돼요. 다음 누적값을 반환해요.
- `initial` (`U`): 누적값의 초기값이에요.

#### 반환 값

(`(source: Iterator<T>) => U`): 이터레이터를 소비하고 마지막 누적값을 반환하는 함수예요.
