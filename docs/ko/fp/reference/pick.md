# pick (함수형 프로그래밍)

객체에서 주어진 키만 남기는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(obj, pick(keys));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`pick`](../../reference/object/pick.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`pick`은 입력 객체에서 지정한 `keys`만 담은 새로운 객체를 반환해요. 입력에 없는 키는 건너뛰어요.

```typescript
import { pick, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, pick(['a', 'c'])); // => { a: 1, c: 3 }
```

#### 파라미터

- `keys` (`readonly K[]`): 새로운 객체로 복사할 키예요.

#### 반환 값

(`(obj: T) => Pick<T, K>`): 객체 `T`를 골라낸 키만 담은 새로운 객체로 변환하는 함수예요.
