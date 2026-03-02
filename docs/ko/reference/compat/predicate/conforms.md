# conforms (Lodash 호환성)

조건 함수들을 가진 객체를 받아서, 다른 객체가 모든 조건을 만족하는지 확인하는 함수를 만들어요.

```typescript
const checker = conforms(predicates);
```

## 사용법

### `conforms(source)`

여러 프로퍼티에 대한 조건들을 한 번에 확인할 때 `conforms`를 사용하세요. 이 함수는 검증 함수를 생성해서 나중에 여러 객체들을 검사할 때 유용해요.

```typescript
import { conforms } from 'es-toolkit/compat';

// 조건 함수들 정의
const isPositive = n => n > 0;
const isEven = n => n % 2 === 0;
const isString = s => typeof s === 'string';

// 여러 조건을 포함한 검증 함수 생성
const validator = conforms({
  a: isPositive,
  b: isEven,
  c: isString,
});

// 객체들 검증
validator({ a: 2, b: 4, c: 'hello' }); // true (모든 조건 만족)
validator({ a: -1, b: 4, c: 'hello' }); // false (a가 양수가 아님)
validator({ a: 2, b: 3, c: 'hello' }); // false (b가 짝수가 아님)
validator({ a: 2, b: 4, c: 123 }); // false (c가 문자열이 아님)

// 배열 필터링에서 사용
const users = [
  { age: 25, score: 80, name: 'Alice' },
  { age: 17, score: 95, name: 'Bob' },
  { age: 30, score: 75, name: 'Charlie' },
];

const adultHighScorer = conforms({
  age: n => n >= 18,
  score: n => n >= 80,
});

const filteredUsers = users.filter(adultHighScorer);
// [{ age: 25, score: 80, name: 'Alice' }]
```

#### 파라미터

- `source` (`Record<PropertyKey, (value: any) => boolean>`): 프로퍼티별 조건 함수들을 가진 객체예요.

#### 반환 값

(`(object: Record<PropertyKey, any>) => boolean`): 주어진 객체가 모든 조건을 만족하는지 확인하는 함수를 반환해요.
