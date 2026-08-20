# IsEqual

두 타입이 정확히 같은지 알려줘요. 같으면 `true`, 다르면 `false`가 돼요.

```typescript
type Same = IsEqual<A, B>;
```

## 사용법

### `IsEqual<A, B>`

할당 가능한지가 아니라 정확히 같은지 비교하고 싶을 때 사용하세요. 보통의 조건부 타입과 달리 `any`를 다른 타입과 구분해 줘서, 타입 테스트에서 실수로 들어간 `any`를 잡아낼 때 유용해요.

```typescript
import type { IsEqual } from 'es-toolkit/types';

type A = IsEqual<{ a: string }, { a: string }>; // true
type B = IsEqual<string, 'literal'>; // false

// 보통의 조건부 타입으로는 구분할 수 없지만, IsEqual은 구분해요.
type C = IsEqual<unknown, any>; // false
type D = IsEqual<any, any>; // true
```

#### 타입 파라미터

- `A`: 비교할 첫 번째 타입이에요.
- `B`: 비교할 두 번째 타입이에요.
