# IsEqual

두 타입이 완전히 같은지 알려줘요. 같으면 `true`, 다르면 `false`가 돼요.

```typescript
type Same = IsEqual<A, B>;
```

## 사용법

### `IsEqual<A, B>`

`A extends B`는 "넣을 수 있는가"를 묻지만, `IsEqual`은 "같은 타입인가"를 물어요. 예를 들어 `'literal'`은 `string`에 넣을 수 있지만 같은 타입은 아니에요.

특히 `any`를 다른 타입과 구분해 주기 때문에, 타입 테스트에서 실수로 들어간 `any`를 잡아낼 때 유용해요.

```typescript
import type { IsEqual } from 'es-toolkit/types';

type A = IsEqual<{ a: string }, { a: string }>; // true
type B = IsEqual<string, 'literal'>; // false

// unknown과 any는 보통 구분되지 않지만, IsEqual은 구분해요.
type C = IsEqual<unknown, any>; // false
type D = IsEqual<any, any>; // true
```

#### 타입 파라미터

- `A`: 비교할 첫 번째 타입이에요.
- `B`: 비교할 두 번째 타입이에요.
