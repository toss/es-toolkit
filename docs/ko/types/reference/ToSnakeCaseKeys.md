# ToSnakeCaseKeys

객체 타입의 모든 키를 재귀적으로 snake_case로 변환해요. [`toSnakeCaseKeys`](../../reference/object/toSnakeCaseKeys.md) 함수의 반환 타입이에요.

```typescript
type Converted = ToSnakeCaseKeys<T>;
```

## 사용법

### `ToSnakeCaseKeys<T>`

키가 snake_case로 변환된 데이터의 타입이 필요할 때 `ToSnakeCaseKeys`를 사용하세요. 예를 들어 요청 본문을 [`toSnakeCaseKeys`](../../reference/object/toSnakeCaseKeys.md)에 통과시킨 결과의 타입을 표현할 수 있어요. 중첩된 객체와 배열 안 객체의 키도 재귀적으로 변환돼요. `Date`나 `Map` 같은 내장 객체와 원시 값은 그대로 유지돼요.

```typescript
import type { ToSnakeCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type ApiUser = ToSnakeCaseKeys<User>;
// => { user_id: number; first_name: string; user_address: { zip_code: string } }
```

#### 타입 파라미터

- `T`: 키를 변환할 타입이에요.
