# isRegExp

주어진 값이 RegExp인지 확인해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `RegExp`로 좁혀요.

## 인터페이스

```typescript
function isRegExp(value: unknown): value is RegExp;
```

### 파라미터

- `value`(`unknown`): RegExp인지 테스트할 값.

### 반환 값

(`value is RegExp`): 값이 RegExp이면 `true`, 아니면 `false`.

## 예시

```typescript
const value1 = /abc/;
const value2 = '/abc/';

console.log(isRegExp(value1)); // true
console.log(isRegExp(value2)); // false
```
