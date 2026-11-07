# IsAny

타입이 `any`인지 알려줘요. `any`면 `true`, 아니면 `false`가 돼요.

```typescript
type Result = IsAny<T>;
```

## 사용법

### `IsAny<T>`

타입 수준 헬퍼에서 `any`를 다른 타입과 다르게 다뤄야 할 때 사용해요. `any`는 모든 `extends` 검사를 양방향으로 통과하기 때문에, 일반 조건부 타입으로는 구분할 수 없어요.

```typescript
import type { IsAny } from 'es-toolkit/types';

type A = IsAny<any>; // true
type B = IsAny<unknown>; // false
type C = IsAny<never>; // false
type D = IsAny<string>; // false
```

#### 타입 파라미터

- `T`: 검사할 타입이에요.
