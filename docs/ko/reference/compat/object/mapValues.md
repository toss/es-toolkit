# mapValues (Lodash 호환성)

::: warning `es-toolkit`의 `mapValues`를 사용하세요

이 `mapValues` 함수는 `null`이나 `undefined` 처리, `iteratee` 변환 과정 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [mapValues](../../object/mapValues.md)를 사용하세요.

:::

객체의 키는 그대로 두고 값을 변환해서 새로운 객체를 만들어요.

```typescript
const result = mapValues(obj, iteratee);
```

## 레퍼런스

### `mapValues(object, iteratee)`

객체의 각 값을 `iteratee` 함수로 변환해서 새로운 객체를 만들어요. 키는 원래대로 유지되고 값만 변경돼요. 문자열, 배열, 객체 모두 처리할 수 있어요. 데이터를 변환하거나 계산할 때 유용해요.

```typescript
import { mapValues } from 'es-toolkit/compat';

// 객체의 값을 변환
const obj = { a: 1, b: 2, c: 3 };
const doubled = mapValues(obj, (value) => value * 2);
// 결과: { a: 2, b: 4, c: 6 }

// 문자열을 대문자로 변환
const names = { first: 'john', last: 'doe' };
const uppercased = mapValues(names, (value) => value.toUpperCase());
// 결과: { first: 'JOHN', last: 'DOE' }

// 문자열의 각 문자 변환
const str = 'abc';
const charMap = mapValues(str, (char) => char.toUpperCase());
// 결과: { '0': 'A', '1': 'B', '2': 'C' }

// 배열을 객체로 변환
const arr = [10, 20, 30];
const arrMap = mapValues(arr, (value, index) => value + index);
// 결과: { '0': 10, '1': 21, '2': 32 }

// 속성 경로로 값 추출
const users = {
  user1: { profile: { name: 'Alice' } },
  user2: { profile: { name: 'Bob' } }
};
const userNames = mapValues(users, 'profile.name');
// 결과: { user1: 'Alice', user2: 'Bob' }
```

`null`이나 `undefined`는 빈 객체로 처리해요.

```typescript
import { mapValues } from 'es-toolkit/compat';

mapValues(null, iteratee); // {}
mapValues(undefined, iteratee); // {}
```

#### 파라미터

- `object` (`string | T[] | T | null | undefined`): 값을 변환할 객체, 배열, 또는 문자열이에요.
- `iteratee` (`ValueIteratee<any>`, 선택): 각 값을 변환할 함수, 속성 경로, 또는 매칭 객체예요. 기본값은 `identity` 함수예요.

#### 반환 값

(`Record<number, T> | { [P in keyof T]: U } | Record<string, boolean> | Record<string, any> | Partial<T>`): 변환된 값을 가진 새로운 객체를 반환해요.
