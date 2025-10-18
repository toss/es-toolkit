# cond (Lodash 호환성)

::: warning if-else 문이나 switch 문을 사용하세요

이 `cond` 함수는 복잡한 iteratee 처리, 배열 변환, 함수 검증 등으로 인해 느리게 동작해요.

대신 더 빠르고 명확한 if-else 문이나 switch 문을 사용하세요.

:::

조건과 함수 쌍들의 배열을 받아서, 조건을 순서대로 확인하며 첫 번째로 참인 조건에 해당하는 함수를 실행하는 함수를 만들어요.

```typescript
const conditionFunction = cond(pairs);
```

## 레퍼런스

### `cond(pairs)`

여러 조건을 순서대로 확인하면서 첫 번째로 참인 조건에 해당하는 함수를 실행하고 싶을 때 `cond`를 사용하세요. 복잡한 조건부 로직을 함수형으로 표현할 때 유용해요.

```typescript
import { cond } from 'es-toolkit/compat';

// 기본 사용법
const getValue = cond([
  [x => x > 10, x => 'big'],
  [x => x > 5, x => 'medium'],
  [x => x > 0, x => 'small'],
  [() => true, () => 'zero or negative'],
]);

console.log(getValue(15)); // "big"
console.log(getValue(8)); // "medium"
console.log(getValue(3)); // "small"
console.log(getValue(-1)); // "zero or negative"
```

객체 패턴 매칭에도 활용할 수 있어요.

```typescript
import { cond } from 'es-toolkit/compat';

const processUser = cond([
  [user => user.role === 'admin', user => `관리자: ${user.name}`],
  [user => user.role === 'user', user => `사용자: ${user.name}`],
  [user => user.role === 'guest', user => `게스트: ${user.name}`],
  [() => true, () => '알 수 없는 역할'],
]);

console.log(processUser({ name: '김철수', role: 'admin' })); // "관리자: 김철수"
console.log(processUser({ name: '이영희', role: 'user' })); // "사용자: 이영희"
```

첫 번째로 참인 조건만 실행되고, 모든 조건이 거짓이면 `undefined`를 반환해요.

```typescript
import { cond } from 'es-toolkit/compat';

const checkValue = cond([
  [x => x > 10, x => 'greater than 10'],
  [x => x < 5, x => 'less than 5'],
]);

console.log(checkValue(15)); // "greater than 10"
console.log(checkValue(3)); // "less than 5"
console.log(checkValue(7)); // undefined (조건에 맞지 않음)
```

#### 파라미터

- `pairs` (`Array<[predicate, func]>`): 조건 함수와 실행할 함수의 쌍들로 이루어진 배열이에요.

#### 반환 값

(`(...args: any[]) => unknown`): 조건을 확인하고 첫 번째로 참인 조건에 해당하는 함수를 실행하는 새로운 함수를 반환해요.
