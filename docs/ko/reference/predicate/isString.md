# isString

주어진 값이 문자열(string)인지 확인해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `string`으로 좁혀요.

## 인터페이스

```typescript
function isString(value: unknown): value is string;
```

### 파라미터

- `value`(`unknown`): 문자열인지 테스트할 값.

### 반환 값

(`value is string`): 값이 문자열이면 `true`, 아니면 `false`.

## 예시

```typescript
const value1 = 'abc';
const value2 = 123;
const value3 = true;

console.log(isString(value1)); // true
console.log(isString(value2)); // false
console.log(isString(value3)); // false
```
