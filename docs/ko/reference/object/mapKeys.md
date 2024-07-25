# mapKeys

키를 `getNewKey` 함수가 반환한 키로 바꾼 새로운 객체를 반환해요. 값은 원래 객체의 값과 동일해요.

## 인터페이스

```typescript
function mapKeys<T extends Record<PropertyKey, unknown>, K1 extends keyof T, K2 extends PropertyKey>(
  object: T,
  getNewKey: (value: T[K1], key: K1, object: T) => N
): Record<K2, T[K]>;
```

### 파라미터

- `obj` (`T extends object`): 키를 바꿀 객체.
- `getNewKey`: (`(value: T[K1], key: K1, object: T) => N`): 새로운 키를 생성하는 함수.

### 반환 값

(`Record<K2, T[K]>`): 키가 바뀐 새로운 객체.

## 예시

```typescript
const obj = { a: 1, b: 2 };
const result = mapKeys(obj, (value, key) => key + value);
console.log(result); // { a1: 1, b2: 2 }
```
