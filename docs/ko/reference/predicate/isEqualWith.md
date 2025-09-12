# isEqualWith

두 값이 동일한지를 주어진 비교 함수를 사용해서 비교해요.

비교 함수를 제공해서 두 값이 동일한지를 검증하는 방법을 세세하게 조정할 수 있어요.
주어진 비교 함수가 `true`를 반환하면, 두 값은 동일하게 취급돼요. `false`를 반환하면, 두 값은 다르게 취급돼요.
`undefined`를 반환하면, [isEqual](./isEqual.md)이 제공하는 기본 방법으로 두 값을 비교해요.

객체, 배열, `Map`, `Set`처럼 여러 요소를 가지고 있을 때도, 주어진 비교 함수로 요소들을 비교해요.

## 인터페이스

```typescript
function isEqualWith(
  a: any,
  b: any,
  areValuesEqual: (
    x: any,
    y: any,
    property?: PropertyKey,
    xParent?: any,
    yParent?: any,
    stack?: Map<any, any>
  ) => boolean | void
): boolean;
```

### 파라미터

- `a` (`unknown`): 비교할 첫 번째 값이에요.
- `b` (`unknown`): 비교할 두 번째 값이에요.
- `areValuesEqual` (`(x: any, y: any, property?: PropertyKey, xParent?: any, yParent?: any, stack?: Map<any, any>) => boolean | void`): 두 값을 비교하는 방법을 나타내는 비교 함수예요. 두 값이 같으면 `true`, 다르면 `false`를 반환할 수 있어요. `undefined`를 반환하면, 기본 방법으로 두 값을 비교해요.
  - `x`: 첫 번째 객체 `a`에 속한 값이에요.
  - `y`: 두 번째 객체 `b`에 속한 값이에요.
  - `property`: `x`와 `y`를 가져오기 위해 사용한 프로퍼티 키예요.
  - `xParent`: 첫 번째 값 `x`의 부모예요.
  - `yParent`: 두 번째 값 `y`의 부모예요.
  - `stack`: 순환 참조를 처리하기 위한 내부 스택(`Map`)이에요.

### 반환 값

(`boolean`): 값이 사용자 정의 기준에 따라 동등하면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

// 대소문자 구분하지 않는 문자열 비교
const caseInsensitiveCompare = (a, b) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};

console.log(isEqualWith('Hello', 'hello', caseInsensitiveCompare)); // true
console.log(isEqualWith({ name: 'Alice' }, { name: 'ALICE' }, caseInsensitiveCompare)); // true

// 숫자 근사치 비교 (부동소수점 오차 허용)
const approximateCompare = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a - b) < 0.01; // 0.01 이하의 차이는 동일하게 처리
  }
};

console.log(isEqualWith(0.1 + 0.2, 0.3, approximateCompare)); // true
console.log(isEqualWith({ price: 10.01 }, { price: 10.02 }, approximateCompare)); // true

// 특정 프로퍼티 무시하고 비교
const ignoreTimestamp = (a, b, property) => {
  if (property === 'timestamp') {
    return true; // timestamp 프로퍼티는 항상 같다고 처리
  }
};

const obj1 = { id: 1, name: 'Test', timestamp: 1000 };
const obj2 = { id: 1, name: 'Test', timestamp: 2000 };
console.log(isEqualWith(obj1, obj2, ignoreTimestamp)); // true

// 배열 길이만 비교
const compareArrayLength = (a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length;
  }
};

console.log(isEqualWith([1, 2, 3], [4, 5, 6], compareArrayLength)); // true
console.log(isEqualWith([1, 2], [3, 4, 5], compareArrayLength)); // false

// 날짜를 문자열로 비교
const dateAsString = (a, b) => {
  if (a instanceof Date && b instanceof Date) {
    return a.toDateString() === b.toDateString();
  }
};

const date1 = new Date('2023-01-01 10:00:00');
const date2 = new Date('2023-01-01 15:30:00');
console.log(isEqualWith(date1, date2, dateAsString)); // true (같은 날짜)

// 복합적인 사용자 정의 비교
const customCompare = (a, b, property, aParent, bParent) => {
  // ID는 무시
  if (property === 'id') {
    return true;
  }
  
  // 이름은 대소문자 구분 없이 비교
  if (property === 'name' && typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
  
  // 나머지는 기본 비교 방식 사용
  return undefined;
};

const user1 = { id: 1, name: 'Alice', age: 25 };
const user2 = { id: 999, name: 'ALICE', age: 25 };
console.log(isEqualWith(user1, user2, customCompare)); // true

// 함수에서 활용
function compareUsers(userA: unknown, userB: unknown): boolean {
  const userCompare = (a, b, prop) => {
    if (prop === 'lastLogin') {
      return true; // 마지막 로그인 시간은 무시
    }
    if (prop === 'email' && typeof a === 'string' && typeof b === 'string') {
      return a.toLowerCase() === b.toLowerCase();
    }
    return undefined;
  };
  
  return isEqualWith(userA, userB, userCompare);
}
```
