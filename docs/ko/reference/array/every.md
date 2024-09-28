# every

컬렉션의 모든 요소가 주어진 조건을 만족하는지 확인해요.

이 함수는 배열, 객체, 문자열을 처리할 수 있으며, 컬렉션의 모든 요소가 조건을 만족하면 `true`, 그렇지 않으면 `false`를 반환해요. 
만약 컬렉션이 `null` 또는 `undefined`일 경우에는 `true`를 반환해요.

빈 배열 `[]`, 빈 문자열 `''`, 빈 객체 `{}`는 기본적으로 `true`를 반환해요.

## 인터페이스

```typescript
function every<T>(
collection: T[] | { [key: string]: T } | string | null | undefined,
predicate: (value: T, indexOrKey: number | string) => boolean
): boolean;
```

### 파라미터

- `collection` (`T[] | { [key: string]: T } | string | null | undefined`): 조건을 확인할 배열, 객체, 문자열 또는 `null`/`undefined`.
- `predicate` (`(value: T, indexOrKey: number | string) => boolean`): 각 요소를 테스트할 함수에요. 현재 요소의 값과 인덱스(또는 객체의 키)를 받아요.

### 반환 값

(`boolean`): 컬렉션의 모든 요소가 조건을 만족하거나 컬렉션이 비어있을 때는 `true`, 그렇지 않으면 `false` 를 반환해요.

## Examples

```typescript
import { every } from 'es-toolkit/collection';

const numbers = [1, 2, 3];
const allPositive = every(numbers, (value) => value > 0);
console.log(allPositive); // true

const str = 'abc';
const allLowerCase = every(str, (char) => /[a-z]/.test(char));
console.log(allLowerCase); // true

const obj = { a: 1, b: 2, c: 3 };
const allGreaterThanZero = every(obj, (value) => value > 0);
console.log(allGreaterThanZero); // true
```
