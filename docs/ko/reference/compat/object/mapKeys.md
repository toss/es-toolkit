# mapKeys (Lodash 호환성)

::: warning `es-toolkit`의 `mapKeys`를 사용하세요

이 `mapKeys` 함수는 `null`이나 `undefined` 처리, `iteratee` 변환 과정 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [mapKeys](../../object/mapKeys.md)를 사용하세요.

:::

객체의 값은 그대로 두고 키를 변환해서 새로운 객체를 만들어요.

```typescript
const result = mapKeys(obj, iteratee);
```

## 사용법

### `mapKeys(object, iteratee)`

객체의 각 키를 `iteratee` 함수로 변환해서 새로운 객체를 만들어요. 값은 원래대로 유지되고 키만 변경돼요. 객체의 키를 변환하거나 정규화할 때 유용해요.

```typescript
import { mapKeys } from 'es-toolkit/compat';

// 키에 접두사 추가
const obj = { a: 1, b: 2, c: 3 };
const result = mapKeys(obj, (value, key) => 'prefix_' + key);
// 결과: { prefix_a: 1, prefix_b: 2, prefix_c: 3 }

// 키를 대문자로 변환
const data = { name: 'John', age: 30 };
const uppercased = mapKeys(data, (value, key) => key.toUpperCase());
// 결과: { NAME: 'John', AGE: 30 }

// 배열 인덱스를 키로 변환
const arr = ['apple', 'banana', 'orange'];
const indexed = mapKeys(arr, (value, index) => `item_${index}`);
// 결과: { item_0: 'apple', item_1: 'banana', item_2: 'orange' }

// 키와 값을 조합해서 새로운 키 생성
const scores = { math: 90, science: 85, english: 92 };
const detailed = mapKeys(scores, (value, key) => `${key}_score_${value}`);
// 결과: { math_score_90: 90, science_score_85: 85, english_score_92: 92 }
```

`null`이나 `undefined`는 빈 객체로 처리해요.

```typescript
import { mapKeys } from 'es-toolkit/compat';

mapKeys(null, iteratee); // {}
mapKeys(undefined, iteratee); // {}
```

#### 파라미터

- `object` (`ArrayLike<T> | T | null | undefined`): 키를 변환할 객체나 배열이에요.
- `iteratee` (`ListIteratee<T> | ObjectIteratee<T>`, 선택): 각 키를 변환할 함수예요. 기본값은 `identity` 함수예요.

#### 반환 값

(`Record<string, T> | Record<string, T[keyof T]>`): 변환된 키를 가진 새로운 객체를 반환해요.
