# omit

객체에서 주어진 키를 제거하는, 데이터를 마지막에 받는 연산자를 만들어요.

```typescript
const result = pipe(obj, omit(keys));
```

## 사용법

`omit`은 입력 객체에서 지정한 `keys`를 제거한 새로운 객체를 반환해요.

```typescript
import { omit, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, omit(['b', 'c'])); // => { a: 1 }
```

#### 파라미터

- `keys` (`readonly K[]`): 새로운 객체에서 제외할 키예요.

#### 반환 값

(`(obj: T) => Omit<T, K>`): 객체 `T`를 제외한 키가 빠진 새로운 객체로 변환하는, 데이터를 마지막에 받는 연산자예요.
