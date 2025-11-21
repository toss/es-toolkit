# mapKeys

객체의 키를 함수를 통해 변환한 새로운 객체를 반환해요.

```typescript
const newObj = mapKeys(object, getNewKey);
```

## 사용법

### `mapKeys(object, getNewKey)`

객체의 각 키를 변환하여 새로운 객체를 만들고 싶을 때 `mapKeys`를 사용하세요. 값은 그대로 유지되고, 키만 `getNewKey` 함수의 결과로 변경돼요.

```typescript
import { mapKeys } from 'es-toolkit/object';

// 키에 접두사를 추가해요
const obj = { a: 1, b: 2 };
const prefixed = mapKeys(obj, (value, key) => `prefix_${key}`);
// prefixed는 { prefix_a: 1, prefix_b: 2 }가 돼요

// 키와 값을 조합해서 새로운 키를 만들어요
const combined = mapKeys(obj, (value, key) => `${key}${value}`);
// combined는 { a1: 1, b2: 2 }가 돼요

// 키를 대문자로 변환해요
const uppercased = mapKeys(obj, (value, key) => key.toString().toUpperCase());
// uppercased는 { A: 1, B: 2 }가 돼요
```

#### 파라미터

- `object` (`T extends Record<PropertyKey, any>`): 키를 변환할 객체예요.
- `getNewKey` (`(value: T[keyof T], key: keyof T, object: T) => K`): 새로운 키를 생성하는 함수예요. 값, 키, 전체 객체를 파라미터로 받아요.

#### 반환 값

(`Record<K, T[keyof T]>`): 키가 변환된 새로운 객체를 반환해요.
