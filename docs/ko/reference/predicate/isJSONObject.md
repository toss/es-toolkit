# isJSONObject

값이 JSON 객체인지 확인해요.

유효한 JSON 객체란, 키로 문자열을 가지고, 값으로 [유효한 JSON 값](./isJSONValue.md)을 가진 객체예요.

## 인터페이스

```typescript
function isJSONObject(obj: unknown): obj is Record<string, any>;
```

### 파라미터

- `obj` (`unknown`): 확인할 값.

### 반환 값

(`obj is Record<string, any>`): `obj`가 JSON 객체이면 `true`, 그렇지 않으면 `false`.

## 예시

```typescript
isJSONObject({ nested: { boolean: true, array: [1, 2, 3], string: 'test', null: null } }); // true
isJSONObject({ regexp: /test/ }); // false
isJSONObject(123); // false
```
