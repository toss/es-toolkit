# flatMap (Lodash 호환성)

::: warning `es-toolkit`의 `flatMap`을 사용하세요

이 `flatMap` 함수는 `null`이나 `undefined` 처리, `ArrayLike` 타입 처리, 다양한 조건 함수 형태 지원 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [flatMap](../../array/flatMap.md)을 사용하세요.

:::

각 요소에 함수를 적용한 후 결과를 평탄화해요.

```typescript
const result = flatMap(collection, iteratee);
```

## 레퍼런스

### `flatMap(collection, iteratee)`

컬렉션의 각 요소에 반복자 함수를 적용한 후 한 단계 평탄화한 배열을 반환해요. 배열, 객체, 문자열을 지원하며 다양한 형태의 반복자를 사용할 수 있어요.

```typescript
import { flatMap } from 'es-toolkit/compat';

// 배열에 함수 적용
function duplicate(n) {
  return [n, n];
}
flatMap([1, 2], duplicate);
// 결과: [1, 1, 2, 2]

// 객체에 함수 적용
const obj = { a: 1, b: 2 };
flatMap(obj, (value, key) => [key, value]);
// 결과: ['a', 1, 'b', 2]

// 문자열 속성으로 매핑
const users = [
  { user: 'barney', hobbies: ['hiking', 'coding'] },
  { user: 'fred', hobbies: ['reading'] },
];
flatMap(users, 'hobbies');
// 결과: ['hiking', 'coding', 'reading']
```

반복자 없이 사용하면 값들을 한 단계 평탄화해요.

```typescript
import { flatMap } from 'es-toolkit/compat';

const obj = { a: [1, 2], b: [3, 4] };
flatMap(obj);
// 결과: [1, 2, 3, 4]
```

부분 객체로 조건 매핑도 가능해요.

```typescript
import { flatMap } from 'es-toolkit/compat';

const users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
];
flatMap(users, { active: false });
// 결과: [false] (active가 false인 요소들의 매칭 결과)
```

#### 파라미터

- `collection` (`object | null | undefined`): 순회할 컬렉션이에요. 배열, 객체, 문자열이 될 수 있어요.
- `iteratee` (`ListIterator | ObjectIterator | string | object`, 선택): 각 요소에 적용할 반복자예요. 함수, 속성 이름, 또는 부분 객체가 될 수 있어요.

#### 반환 값

(`any[]`): 매핑 후 한 단계 평탄화된 새 배열을 반환해요.
