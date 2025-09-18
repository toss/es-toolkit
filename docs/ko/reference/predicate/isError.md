# isError

주어진 값이 `Error` 객체인지 확인해요.

```typescript
const result = isError(value);
```

## 레퍼런스

### `isError(value)`

주어진 값이 `Error` 객체인지 확인하고 싶을 때 `isError`를 사용하세요. TypeScript에서 타입 가드로 활용해서 값의 타입을 `Error`로 좁힐 수 있어요. try-catch 블록이나 API 응답 처리할 때 특히 유용해요.

```typescript
import { isError } from 'es-toolkit/predicate';

// Error 객체 확인
isError(new Error('Something went wrong')); // true
isError(new TypeError('Type error')); // true

// 다른 타입들과 구분
isError('error'); // false
isError({ name: 'Error', message: 'Custom error' }); // false
```

TypeScript에서 타입 가드로 사용하면 값의 타입이 좁혀져요.

```typescript
function handleError(value: unknown) {
  if (isError(value)) {
    // value는 Error로 타입이 좁혀져요
    console.log(`에러 발생: ${value.message}`);
    return value.name;
  }
  return '에러가 아니에요';
}
```

#### 파라미터

- `value` (`unknown`): `Error` 객체인지 확인할 값이에요.

#### 반환 값

(`value is Error`): 값이 `Error` 객체이면 `true`, 아니면 `false`를 반환해요.

