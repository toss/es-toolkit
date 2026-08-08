# Writable

객체의 모든 프로퍼티에서 `readonly` 표시를 없애요. 기본 `Readonly`의 반대예요.

```typescript
type Mutable = Writable<T>;
```

## 사용법

### `Writable<T>`

`as const`나 `Readonly`로 굳어진 타입을 다시 수정 가능하게 만들고 싶을 때 사용하세요.

```typescript
import type { Writable } from 'es-toolkit/types';

type Config = { readonly host: string; readonly port: number };

type MutableConfig = Writable<Config>;
// => { host: string; port: number }

const config: MutableConfig = { host: 'localhost', port: 8080 };
config.port = 3000; // ok
```

`readonly`는 가장 바깥 프로퍼티에서만 제거해요. 중첩된 객체 안쪽까지는 건드리지 않으니, 얕은 범위에서만 쓰세요.

#### 타입 파라미터

- `T`: 수정 가능하게 만들 객체 타입이에요.
