# isWeakMap

이 함수는 주어진 값이 `WeakMap`의 인스턴스인지 확인해요.
값이 `WeakMap`이면 `true`, 아니면 `false`를 반환해요.

TypeScript의 타입 가드로 주로 사용되는데요, 파라미터로 주어진 값을 `WeakMap`인 타입으로 좁힐 수 있어요.

## 인터페이스

```typescript
function isWeakMap(value: unknown): value is WeakMap<WeakKey, any>;
```

### 파라미터

- `value` (`unknown`): `WeakMap`인지 확인할 값.

### 반환 값

(`value is WeakMap<WeakKey, any>`): 값이 `WeakMap`이면 `true`, 아니면 `false`.

## 예시

```typescript
const value1 = new WeakMap();
const value2 = new Map();
const value3 = new Set();

console.log(isWeakMap(value1)); // true
console.log(isWeakMap(value2)); // false
console.log(isWeakMap(value3)); // false
```
