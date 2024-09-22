# isError

주어진 값이 Error 객체인지 확인해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `Error`로 좁혀요.

## 인터페이스

```typescript
function isError(value: unknown): value is Error;
```

### 파라미터

- `value`(`unknown`): Error 객체인지 테스트할 값.

### 반환 값

(`value is Error`): 값이 Error 객체이면 `true`, 아니면 `false`.

## 예시

```typescript
isError(new Error()); // true
isError('error'); // false
isError({ name: 'Error', message: '' }); // false
```
