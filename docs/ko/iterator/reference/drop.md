# drop (함수형 프로그래밍)

이터레이터의 처음 `count`개 요소를 지연 평가 방식으로 건너뛰고 나머지를 내보내는 함수를 만들어요. [`pipe`](../../fp/reference/pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, drop(count));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 네이티브 [`Iterator.prototype.drop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/drop)을 쓰는 것이 좋아요: `source.drop(count)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `drop(count)`

`drop`은 앞쪽 요소를 정해진 개수만큼 건너뛰어요. 건너뛴 요소는 소스에서 꺼내지지만 내보내지지는 않고, 그 이후의 모든 요소는 지연 평가 방식으로 그대로 통과해요. 개수 대신 조건에 따라 건너뛰려면 [`dropWhile`](./dropWhile.md)을 사용하세요. 네이티브 `Iterator.prototype.drop`에 위임해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { drop, toArray } from 'es-toolkit/fp/iterator';

// 처음 두 요소를 건너뛰어요.
pipe([1, 2, 3, 4, 5].values(), drop(2), toArray());
// 반환 값: [3, 4, 5]
```

#### 파라미터

- `count` (`number`): 건너뛸 요소의 개수예요. 음수가 아닌 숫자여야 해요.

#### 반환 값

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): 이터레이터를, 남은 요소들을 내보내는 지연 평가 이터레이터로 변환하는 함수예요.

#### 에러

`count`가 음수이거나 `NaN`이면 `RangeError`를 던져요(네이티브 동작).
