# isBlob

주어진 값이 `Blob`인지 확인합니다.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `Blob`으로 좁혀요.

## 시그니처

```typescript
function isBlob(x: unknown): x is Blob;
```

### 매개변수

- `x` (`unknown`): Blob인지 확인할 값.

### 반환값

(`x is Blob`): 값이 Blob이면 `true`, 그렇지 않으면 `false`.

## 예시

```typescript
const value1 = new Blob();
const value2 = {};
const value3 = new File(['content'], 'example.txt', { type: 'text/plain' });

console.log(isBlob(value1)); // true
console.log(isBlob(value2)); // false
console.log(isBlob(value3)); // true
```
