# isArray

주어진 값이 배열인지 확인해요.

이 함수는 주어진 값이 배열인지 확인해요.
값이 배열이라면 `true`, 아니면 `false`를 반환해요.

TypeScript의 타입 가드로 주로 사용되는데요, 파라미터로 주어진 값을 배열 타입으로 좁힐 수 있어요.

## 인터페이스

```typescript
function isArray<T>(value: T): value is Extract<T, unknown[] | Readonly<unknown[]>>;
```

### 파라미터

- `value` (`T`): 배열인지 확인할 값.

### 반환 값

(`value is Extract<T, unknown[] | Readonly<unknown[]>>`): 값이 배열이면 `true`, 아니면 `false`.

## 예시

```typescript
const value1 = [1, 2, 3];
const value2 = 'abc';
const value3 = () => {};

console.log(isArray(value1)); // true
console.log(isArray(value2)); // false
console.log(isArray(value3)); // false
```
