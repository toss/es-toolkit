# isMap

주어진 값이 `Map`의 인스턴스인지 확인해요.

값이 `Map`이면 `true`, 아니면 `false`를 반환해요.

TypeScript의 타입 가드로 주로 사용되는데요, 파라미터로 주어진 값을 `Map`인 타입으로 좁힐 수 있어요.

## 인터페이스

```typescript
function isMap(value: unknown): value is Map<any, any>;
```

### 파라미터

- `value` (`unknown`): `Map`인지 확인할 값.

### 반환 값

(`value is Map<any, any>`): 값이 `Map`이면 `true`, 아니면 `false`.

## 예시

```typescript
const value1 = new Map();
const value2 = new Set();
const value3 = new WeakMap();

console.log(isMap(value1)); // true
console.log(isMap(value2)); // false
console.log(isMap(value3)); // false
```
