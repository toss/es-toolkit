# IsUnknown

타입이 `unknown`인지 알려줘요. `unknown`이면 `true`, 아니면 `false`가 돼요.

```typescript
type Result = IsUnknown<T>;
```

## 사용법

### `IsUnknown<T>`

타입 수준 헬퍼에서 `unknown` 입력을 구체적인 타입과 다르게 다뤄야 할 때 사용해요. 단순한 `unknown extends T` 검사는 `any`에도 `true`가 되지만, `IsUnknown`은 둘을 구분해요.

```typescript
import type { IsUnknown } from 'es-toolkit/types';

type A = IsUnknown<unknown>; // true
type B = IsUnknown<any>; // false
type C = IsUnknown<never>; // false
type D = IsUnknown<string>; // false
```

#### 타입 파라미터

- `T`: 검사할 타입이에요.
