# isPromise

주어진 값이 `Promise`의 인스턴스인지 확인해요.

값이 `Promise`이면 `true`, 아니면 `false`를 반환해요.

TypeScript의 타입 가드로 주로 사용되는데요, 파라미터로 주어진 값을 `Promise`인 타입으로 좁힐 수 있어요.

## 인터페이스

```typescript
function isPromise(value: unknown): value is Promise<any>;
```

### 파라미터

- `value` (`unknown`): `Promise`인지 확인할 값.

### 반환 값

(`value is Promise<any>`): `value`가 `Promise`이면 `true`, 그렇지 않으면 `false`.

## 예시

```typescript
const value1 = new Promise((resolve) => resolve());
const value2 = {};
const value3 = 123;

console.log(isPromise(value1)); // true
console.log(isPromise(value2)); // false
console.log(isPromise(value3)); // false
```