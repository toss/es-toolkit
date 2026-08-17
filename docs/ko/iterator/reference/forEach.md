# forEach (`Iterator`)

이터레이터를 소비하면서 각 요소에 대해 콜백을 실행하는 함수를 만들어요. [`pipe`](../../fp/reference/pipe.md)와 같이 사용해요.

```typescript
pipe(source, forEach(callback));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 네이티브 [`Iterator.prototype.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/forEach)를 쓰는 것이 좋아요: `source.forEach(callback)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `forEach(callback)`

`forEach`는 부수 효과를 위한 종결 단계예요. 모든 요소를 꺼내면서 각 요소에 대해 `callback`을 실행해요. 이터레이터 전체를 소비하기 때문에, 무한 이터레이터에는 사용하면 안 돼요. 네이티브 `Iterator.prototype.forEach`에 위임해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, forEach } from 'es-toolkit/fp/iterator';

// 각 짝수를 로그로 출력해요.
pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  forEach(x => console.log(x))
);
// 로그 출력: 2, 4
```

#### 파라미터

- `callback` (`(value: T, index: number) => void`): 각 요소와 인덱스로 호출돼요.

#### 반환 값

(`(source: Iterator<T>) => void`): 이터레이터를 소비하고 아무것도 반환하지 않는 함수예요.
