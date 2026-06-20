# pick

객체에서 주어진 키만 남기는, 데이터를 마지막에 받는 연산자를 만들어요.

```typescript
const result = pipe(obj, pick(keys));
```

## 사용법

`pick`은 입력 객체에서 지정한 `keys`만 담은 새로운 객체를 반환해요. 입력에 없는 키는 건너뛰어요.

```typescript
import { pick, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, pick(['a', 'c'])); // => { a: 1, c: 3 }
```

#### 파라미터

- `keys` (`readonly K[]`): 새로운 객체로 복사할 키예요.

#### 반환 값

(`(obj: T) => Pick<T, K>`): 객체 `T`를 선택한 키만 가진 새로운 객체로 변환하는, 데이터를 마지막에 받는 연산자예요.
