# overEvery (Lodash 호환성)

::: warning `Array.every`를 사용하세요

이 `overEvery` 함수는 조건 함수들을 변환하고 검사하는 과정에서 추가적인 오버헤드가 발생해요.

대신 더 빠르고 현대적인 `Array.every` 메서드를 사용하세요.

:::

모든 조건 함수가 참으로 평가되는 값을 반환하는지 확인하는 함수를 만들어요.

```typescript
const allValidator = overEvery(predicates);
```

## 사용법

### `overEvery(...predicates)`

여러 조건 함수를 받아서 주어진 값이 모든 조건을 만족하는지 확인하는 함수를 생성해요. 복합 조건 검사나 데이터 검증에 유용해요.

```typescript
import { overEvery } from 'es-toolkit/compat';

// 문자열 조건들을 검사해요
const isValidString = overEvery([
  value => typeof value === 'string',
  value => value.length > 3,
  value => value.includes('o'),
]);

isValidString('hello'); // => true
isValidString('hi'); // => false (길이가 3 이하)
isValidString('test'); // => false ('o'가 없음)

// 숫자 범위를 검사해요
const isInRange = overEvery([
  num => num >= 0,
  num => num <= 100,
  num => num % 1 === 0, // 정수인지 확인
]);

isInRange(50); // => true
isInRange(-5); // => false (0 미만)
isInRange(150); // => false (100 초과)
isInRange(50.5); // => false (정수가 아님)
```

객체 속성도 검사할 수 있어요.

```typescript
import { overEvery } from 'es-toolkit/compat';

// 객체 속성을 검사해요
const isValidUser = overEvery([
  'name', // name 속성이 참으로 평가되는지
  { age: 30 }, // age가 30인지
  ['active', true], // active가 true인지
]);

isValidUser({ name: 'John', age: 30, active: true }); // => true
isValidUser({ name: '', age: 30, active: true }); // => false (name이 빈 문자열)
isValidUser({ name: 'John', age: 25, active: true }); // => false (age가 다름)
```

#### 파라미터

- `...predicates` (`Array<Function | string | object | Array>`): 검사할 조건 함수들이에요. 함수, 속성 이름, 객체, 속성-값 쌍 등이 될 수 있어요.

#### 반환 값

(`(...args: any[]) => boolean`): 모든 조건을 만족하면 `true`, 하나라도 만족하지 않으면 `false`를 반환하는 함수를 반환해요.
