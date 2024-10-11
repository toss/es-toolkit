# isFile

주어진 값이 `File`인지 확인합니다.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `File`로 좁혀요.

## 시그니처

```typescript
function isFile(x: unknown): x is File;
```

### 매개변수

- `x` (`unknown`): `File`인지 확인할 값.

### 반환값

(`x is File`): 값이 File이면 `true`, 그렇지 않으면 `false`.

## 예시

```typescript
const file = new File(['content'], 'example.txt', { type: 'text/plain' });
const blob = new Blob(['content'], { type: 'text/plain' });
const value = {};

console.log(isFile(file)); // true
console.log(isFile(blob)); // false
console.log(isFile(value)); // false
```
