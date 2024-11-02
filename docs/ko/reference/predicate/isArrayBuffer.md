# isArrayBuffer

주어진 값이 `ArrayBuffer`의 인스턴스인지 확인해요.

값이 `ArrayBuffer`이면 `true`, 아니면 `false`를 반환해요.

TypeScript의 타입 가드로 주로 사용되는데요, 파라미터로 주어진 값을 `ArrayBuffer`인 타입으로 좁힐 수 있어요.

## 인터페이스

```typescript
function isArrayBuffer(value: unknown): value is ArrayBuffer;
```

### 파라미터

- `value` (`unknown`): `ArrayBuffer`인지 확인할 값.

### 반환 값

(`value is ArrayBuffer`): 값이 `ArrayBuffer`이면 `true`, 아니면 `false`.

## 예시

```typescript
const value1 = new ArrayBuffer();
const value2 = new Array();
const value3 = new Map();

console.log(isArrayBuffer(value1)); // true
console.log(isArrayBuffer(value2)); // false
console.log(isArrayBuffer(value3)); // false
```
