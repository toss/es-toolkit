# isJSONValue

주어진 값이 유효한 JSON 값인지 확인해요.

유효한 JSON 값이란, 다음 중 하나를 말해요.

- [JSON 객체](./isJSONObject.md) (문자열 키와 유효한 JSON 값을 가진 객체)
- [JSON 배열](./isJSONArray.md) (유효한 JSON 값의 배열)
- 문자열 (`string`)
- 숫자 (`number`)
- 참값 (`boolean`)
- `null`

## 인터페이스

```typescript
function isJSONValue(value: unknown): value is Record<string, any> | any[] | string | number | boolean | null;
```

### 파라미터

- `value` (`unknown`): 확인할 값.

### 반환 값

(`value is Record<string, any> | any[] | string | number | boolean | null`): 값이 유효한 JSON 값이면 `true`, 그렇지 않으면 `false`.

## 예시

```typescript
console.log(isJSONValue(null)); // true
console.log(isJSONValue({ key: 'value' })); // true
console.log(isJSONValue([1, 2, 3])); // true
console.log(isJSONValue('Hello')); // true
console.log(isJSONValue(42)); // true
console.log(isJSONValue(true)); // true
console.log(isJSONValue(undefined)); // false
console.log(isJSONValue(() => {})); // false
```
