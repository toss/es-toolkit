# isEqual

두 값이 동일한지 확인해요. `Date`, `RegExp`, 깊은 객체 비교도 지원해요.

## 인터페이스

```typescript
function isEqual(a: unknown, b: unknown): boolean;
```

### 파라미터

- `a` (`unknown`): 비교할 첫 번째 값이에요.
- `b` (`unknown`): 비교할 두 번째 값이에요.

### 반환 값

(`boolean`): 두 값이 동일하면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
import { isEqual } from 'es-toolkit/predicate';

// 원시 타입 비교
console.log(isEqual(1, 1)); // true
console.log(isEqual('hello', 'hello')); // true
console.log(isEqual(true, true)); // true
console.log(isEqual(1, 2)); // false

// 특수 경우 처리
console.log(isEqual(NaN, NaN)); // true
console.log(isEqual(+0, -0)); // true

// 날짜 객체 비교
const date1 = new Date('2020-01-01');
const date2 = new Date('2020-01-01');
console.log(isEqual(date1, date2)); // true

const date3 = new Date('2021-01-01');
console.log(isEqual(date1, date3)); // false

// 정규 표현식 비교
const regex1 = /hello/g;
const regex2 = /hello/g;
console.log(isEqual(regex1, regex2)); // true

const regex3 = /hello/i;
console.log(isEqual(regex1, regex3)); // false

// 깊은 객체 비교
const obj1 = { a: 1, b: { c: 2, d: [3, 4] } };
const obj2 = { a: 1, b: { c: 2, d: [3, 4] } };
console.log(isEqual(obj1, obj2)); // true

const obj3 = { a: 1, b: { c: 3, d: [3, 4] } };
console.log(isEqual(obj1, obj3)); // false

// 배열 비교
const arr1 = [1, 2, [3, 4]];
const arr2 = [1, 2, [3, 4]];
console.log(isEqual(arr1, arr2)); // true

const arr3 = [1, 2, [3, 5]];
console.log(isEqual(arr1, arr3)); // false

// Map과 Set 비교
const map1 = new Map([['key', 'value']]);
const map2 = new Map([['key', 'value']]);
console.log(isEqual(map1, map2)); // true

const set1 = new Set([1, 2, 3]);
const set2 = new Set([1, 2, 3]);
console.log(isEqual(set1, set2)); // true

// 복잡한 중첩 구조 비교
const complex1 = {
  users: [
    { id: 1, name: 'Alice', roles: new Set(['admin', 'user']) },
    { id: 2, name: 'Bob', roles: new Set(['user']) }
  ],
  settings: new Map([['theme', 'dark'], ['lang', 'ko']])
};

const complex2 = {
  users: [
    { id: 1, name: 'Alice', roles: new Set(['admin', 'user']) },
    { id: 2, name: 'Bob', roles: new Set(['user']) }
  ],
  settings: new Map([['theme', 'dark'], ['lang', 'ko']])
};

console.log(isEqual(complex1, complex2)); // true

// 유니터 테스트에서 활용
function testApiResponse() {
  const expected = { status: 200, data: { message: 'success' } };
  const actual = { status: 200, data: { message: 'success' } };
  
  if (isEqual(expected, actual)) {
    console.log('테스트 통과!');
  } else {
    console.log('테스트 실패!');
  }
}
```
