# overSome (Lodash 호환성)

::: warning `Array.some`을 사용하세요

이 `overSome` 함수는 조건 함수들을 변환하고 검사하는 과정에서 추가적인 오버헤드가 발생해요.

대신 더 빠르고 현대적인 `Array.some` 메서드를 사용하세요.

:::

조건 함수 중 하나라도 참으로 평가되는 값을 반환하는지 확인하는 함수를 만들어요.

```typescript
const anyValidator = overSome(predicates);
```

## 사용법

### `overSome(...predicates)`

여러 조건 함수를 받아서 주어진 값이 조건 중 하나라도 만족하는지 확인하는 함수를 생성해요. 유연한 조건 검사나 대안 검증에 유용해요.

```typescript
import { overSome } from 'es-toolkit/compat';

// 문자열이나 숫자인지 확인해요
const isStringOrNumber = overSome([value => typeof value === 'string', value => typeof value === 'number']);

isStringOrNumber('hello'); // => true
isStringOrNumber(42); // => true
isStringOrNumber(true); // => false

// 여러 조건 중 하나라도 만족하는지 확인해요
const hasValidProperty = overSome([
  obj => obj.name && obj.name.length > 0,
  obj => obj.email && obj.email.includes('@'),
  obj => obj.phone && obj.phone.length >= 10,
]);

hasValidProperty({ name: 'John' }); // => true
hasValidProperty({ email: 'john@example.com' }); // => true
hasValidProperty({ phone: '1234567890' }); // => true
hasValidProperty({ age: 30 }); // => false
```

객체 속성도 검사할 수 있어요.

```typescript
import { overSome } from 'es-toolkit/compat';

// 여러 조건 중 하나라도 매칭되는지 확인해요
const matchesAnyCondition = overSome([
  'isActive', // isActive 속성이 참으로 평가되는지
  { role: 'admin' }, // role이 'admin'인지
  ['status', 'vip'], // status가 'vip'인지
]);

matchesAnyCondition({ isActive: true }); // => true
matchesAnyCondition({ role: 'admin' }); // => true
matchesAnyCondition({ status: 'vip' }); // => true
matchesAnyCondition({ role: 'user', status: 'normal' }); // => false
```

#### 파라미터

- `...predicates` (`Array<Function | string | object | Array>`): 검사할 조건 함수들이에요. 함수, 속성 이름, 객체, 속성-값 쌍 등이 될 수 있어요.

#### 반환 값

(`(...args: any[]) => boolean`): 조건 중 하나라도 만족하면 `true`, 모두 만족하지 않으면 `false`를 반환하는 함수를 반환해요.
