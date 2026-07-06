# omit (함수형 프로그래밍)

객체에서 주어진 키를 제거하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(obj, omit(keys));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`omit`](../../reference/object/omit.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`omit`은 입력 객체에서 지정한 `keys`를 제거한 새로운 객체를 반환해요.

```typescript
import { omit, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, omit(['b', 'c'])); // => { a: 1 }
```

#### 파라미터

- `keys` (`readonly K[]`): 새로운 객체에서 제외할 키예요.

#### 반환 값

(`(obj: T) => Omit<T, K>`): 객체 `T`를 제외한 키가 없는 새로운 객체로 변환하는 함수예요.
