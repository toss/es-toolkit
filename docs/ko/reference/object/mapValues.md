# mapValues

값을 `getNewValue` 함수가 반환한 값으로 바꾼 새로운 객체를 반환해요. 키는 원래 객체의 키와 동일해요.

## Signature

```typescript
function mapValues<T extends object, K extends keyof T, V>(
  object: T,
  getNewValue: (value: T[K], key: K, object: T) => V
): Record<K, V>;
```

### 파라미터

- `obj` (`T extends object`): 값을 바꿀 객체.
- `getNewValue`: (`(value: T[K], key: K, object: T) => V`): 새로운 값을 생성할 함수.

### 반환 값

(`Record<K, V>`): `getNewValue` 함수가 반환한 값으로 바꾼 새로운 객체

## 예시

```typescript
const obj = { a: 1, b: 2 };
const result = mapValues(obj, value => value * 2);
console.log(result); // { a: 2, b: 4 }
```
