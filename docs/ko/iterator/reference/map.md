# map (`Iterator`용)

이터레이터의 각 요소를 지연 평가 방식으로 변환하는 함수를 만들어요. [`pipe`](../../fp/reference/pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, map(callback));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 네이티브 [`Iterator.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map)을 쓰는 것이 좋아요: `source.map(callback)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `map(callback)`

`map`은 변환 함수를 받아서, 이터레이터를 지연 평가 방식으로 변환하는 함수를 반환해요. 각 요소는 실제로 꺼내질 때만 변환되기 때문에, 일찍 멈추는 단계와 조합해도 불필요한 작업을 하지 않아요. 네이티브 `Iterator.prototype.map`에 위임해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, take, toArray } from 'es-toolkit/fp/iterator';

// 지연 평가로 변환해요. 소비된 두 요소만 계산돼요.
pipe([1, 2, 3, 4].values(), map(x => x * 10), take(2), toArray());
// 반환 값: [10, 20]
```

#### 파라미터

- `callback` (`(value: T, index: number) => U`): 각 요소와 인덱스로 호출돼요. 변환된 요소를 반환해요.

#### 반환 값

(`(source: Iterator<T>) => IteratorObject<U, undefined>`): 이터레이터를, 변환된 요소들을 내보내는 지연 평가 이터레이터로 변환하는 함수예요.
