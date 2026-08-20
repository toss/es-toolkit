# ToCamelCaseKeys

객체 타입의 모든 키를 재귀적으로 카멜 표기법(camelCase)으로 변환해요. [`toCamelCaseKeys`](../../../reference/object/toCamelCaseKeys.md) 함수의 반환 타입이에요.

```typescript
type Converted = ToCamelCaseKeys<T>;
```

## 사용법

### `ToCamelCaseKeys<T>`

키가 카멜 표기법으로 변환된 데이터의 타입이 필요할 때 `ToCamelCaseKeys`를 사용하세요. 예를 들어 API 응답을 [`toCamelCaseKeys`](../../../reference/object/toCamelCaseKeys.md)로 변환한 결과의 타입을 표현할 수 있어요. 중첩된 객체와 배열 내 객체의 키도 재귀적으로 변환돼요. `Date`나 `Map` 같은 내장 객체와 원시 값은 그대로 유지돼요.

```typescript
import type { ToCamelCaseKeys } from 'es-toolkit/types';

type ApiUser = {
  user_id: number;
  first_name: string;
  user_address: { zip_code: string };
};

type User = ToCamelCaseKeys<ApiUser>;
// => { userId: number; firstName: string; userAddress: { zipCode: string } }
```

#### 타입 파라미터

- `T`: 키를 변환할 타입이에요.
