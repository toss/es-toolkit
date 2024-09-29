# isJSONArray

주어진 값이 유효한 JSON 배열인지 확인해요.

유효한 JSON 배열이란, 모든 항목이 [유효한 JSON 값](./isJSONValue.md)인 배열이에요.

## 인터페이스

```typescript
function isJSONArray(value: unknown): value is any[];
```

### 파라미터

- `value` (`unknown`): 확인할 값.

### 반환 값

(`value is any[]`): 값이 유효한 JSON 배열이면 `true`, 그렇지 않으면 `false`.

## 예시

```typescript
console.log(isJSONArray([1, 2, 3])); // true
console.log(isJSONArray(['string', null, true])); // true
console.log(isJSONArray([1, 2, () => {}])); // false
console.log(isJSONArray('not an array')); // false
```
