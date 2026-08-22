# ToConstantCaseKeys

객체 타입의 모든 키를 재귀적으로 상수 표기법(CONSTANT_CASE)으로 변환해요. [`toConstantCaseKeys`](../../../reference/object/toConstantCaseKeys.md) 함수의 반환 타입이에요.

```typescript
type Converted = ToConstantCaseKeys<T>;
```

## 사용법

### `ToConstantCaseKeys<T>`

키가 상수 표기법으로 변환된 데이터의 타입이 필요할 때 `ToConstantCaseKeys`를 사용하세요. 예를 들어 객체를 [`toConstantCaseKeys`](../../../reference/object/toConstantCaseKeys.md)로 변환한 결과의 타입을 표현할 수 있어요. 중첩된 객체와 배열 내 객체의 키도 재귀적으로 변환돼요. `Date`나 `Map` 같은 내장 객체와 원시 값은 그대로 유지돼요.

```typescript
import type { ToConstantCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type ConstantUser = ToConstantCaseKeys<User>;
// => { USER_ID: number; FIRST_NAME: string; USER_ADDRESS: { ZIP_CODE: string } }
```

#### 타입 파라미터

- `T`: 키를 변환할 타입이에요.
