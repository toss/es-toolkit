# isBuffer

주어진 값이 Buffer 인스턴스인지 확인해요.

값이 Buffer이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `Buffer`으로 좁혀요.

## 인터페이스

```typescript
function isBuffer(x: unknown): x is Buffer;
```

### 파라미터

- `x` (`unknown`): Buffer인지 확인할 값.

### 반환 값

(`x is Buffer`): `x`가 Buffer이면 `true`, 그렇지 않으면 `false`.

## 예시

```typescript
const buffer = Buffer.from('test');
console.log(isBuffer(buffer)); // true

const notBuffer = 'not a buffer';
console.log(isBuffer(notBuffer)); // false
```
