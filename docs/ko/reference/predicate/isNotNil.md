# isNotNil

주어진 값이 null이나 undefined이 아닌지 확인해요.

값이 `null` 이나 `undefined` 이 아니면 `true` 를 반환하고, 맞으면 `false` 를 반환해요.

TypeScript의 타입 가드로 주로 사용되는데요, 파라미터로 주어진 값을 `null` 이나 `undefined`이 아닌 타입으로 좁힐 수 있어요. Nullable이 아님을 타입으로 보장할 수 있어요.

## 인터페이스

```typescript
function isNotNil<T>(x: T | null | undefined): x is T;
```

### 파라미터 

- `x` (`T | null | undefined`): 값null이나 undefined가 아님을 확인할 값.

### 반환 값

(`x is T`): 값이 null이나 undefined가 아니면 true. 맞으면 false.

## 예시

```typescript
// `arr`의 타입은 (number | undefined)[] 예요
const arr = [1, undefined, 3];
// `result`의 타입은 number[] 예요
const result = arr.filter(isNotNil);
// `result` 값은 [1, 3]이 되어요
```