# isObjectLike

주어진 값이 객체 같은지 확인해요.

객체 같은 값이란, `typeof` 연산의 결과가 `'object'` 이고 `null`이 아닌 값을 말해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 객체 같은 값으로 좁혀요.

## 인터페이스

```typescript
export function isObjectLike(value: unknown): value is object;
```

### 파라미터

- `value` (`T`): 객체 같은지 확인할 값이에요.

### 반환 값

(`value is object`): 주어진 값이 객체 같으면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
import { isObjectLike } from 'es-toolkit/predicate';

const value1 = { a: 1 };
const value2 = [1, 2, 3];
const value3 = 'abc';
const value4 = () => {};
const value5 = null;

console.log(isObjectLike(value1)); // true
console.log(isObjectLike(value2)); // true
console.log(isObjectLike(value3)); // false
console.log(isObjectLike(value4)); // false
console.log(isObjectLike(value5)); // false
```
