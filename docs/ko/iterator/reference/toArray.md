# toArray (`Iterator`용)

이터레이터의 요소들을 배열로 모으는 함수를 만들어요. [`pipe`](../../fp/reference/pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, toArray());
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 네이티브 [`Iterator.prototype.toArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/toArray)를 쓰는 것이 좋아요: `source.toArray()`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `toArray()`

`toArray`는 이터레이터 파이프라인에서 가장 흔히 쓰이는 종결 단계예요. 모든 요소를 꺼내서 배열로 반환해요. 이터레이터 전체를 소비하기 때문에, 무한 이터레이터에는 사용하면 안 돼요 — 먼저 [`take`](./take.md)나 [`takeWhile`](./takeWhile.md)로 파이프라인의 범위를 제한하세요. 네이티브 `Iterator.prototype.toArray`에 위임해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, toArray } from 'es-toolkit/fp/iterator';

// 변환된 요소들을 배열로 만들어요.
pipe([1, 2, 3].values(), map(x => x * 2), toArray());
// 반환 값: [2, 4, 6]
```

#### 반환 값

(`(source: Iterator<T>) => T[]`): 이터레이터를 소비하고 그 요소들을 배열로 반환하는 함수예요.
