# ToPascalCaseKeys

객체 타입의 모든 키를 재귀적으로 파스칼 표기법(PascalCase)으로 변환해요. [`toPascalCaseKeys`](../../reference/object/toPascalCaseKeys.md) 함수의 반환 타입이에요.

```typescript
type Converted = ToPascalCaseKeys<T>;
```

## 사용법

### `ToPascalCaseKeys<T>`

키가 파스칼 표기법으로 변환된 데이터의 타입이 필요할 때 `ToPascalCaseKeys`를 사용하세요. 예를 들어 외부 API에 보낼 데이터를 [`toPascalCaseKeys`](../../reference/object/toPascalCaseKeys.md)로 변환한 결과의 타입을 표현할 수 있어요. 중첩된 객체와 배열 내 객체의 키도 재귀적으로 변환돼요. `Date`나 `Map` 같은 내장 객체와 원시 값은 그대로 유지돼요.

```typescript
import type { ToPascalCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type PascalUser = ToPascalCaseKeys<User>;
// => { UserId: number; FirstName: string; UserAddress: { ZipCode: string } }
```

#### 타입 파라미터

- `T`: 키를 변환할 타입이에요.
