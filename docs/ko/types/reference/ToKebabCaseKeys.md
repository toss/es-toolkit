# ToKebabCaseKeys

객체 타입의 모든 키를 재귀적으로 케밥 표기법(kebab-case)으로 변환해요. [`toKebabCaseKeys`](../../reference/object/toKebabCaseKeys.md) 함수의 반환 타입이에요.

```typescript
type Converted = ToKebabCaseKeys<T>;
```

## 사용법

### `ToKebabCaseKeys<T>`

키가 케밥 표기법으로 변환된 데이터의 타입이 필요할 때 `ToKebabCaseKeys`를 사용하세요. 예를 들어 객체를 [`toKebabCaseKeys`](../../reference/object/toKebabCaseKeys.md)로 변환한 결과의 타입을 표현할 수 있어요. 중첩된 객체와 배열 내 객체의 키도 재귀적으로 변환돼요. `Date`나 `Map` 같은 내장 객체와 원시 값은 그대로 유지돼요.

```typescript
import type { ToKebabCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type KebabUser = ToKebabCaseKeys<User>;
// => { 'user-id': number; 'first-name': string; 'user-address': { 'zip-code': string } }
```

#### 타입 파라미터

- `T`: 키를 변환할 타입이에요.
