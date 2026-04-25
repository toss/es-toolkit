# flatMapDeep (Lodash 호환성)

::: warning `es-toolkit`의 [`flatMapDeep`](../../array/flatMapDeep.md)를 사용하세요

이 `flatMapDeep` 함수는 복잡한 컬렉션 타입 처리와 깊은 평탄화 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [flatMapDeep](../../array/flatMapDeep.md)를 사용하세요.

:::

각 요소에 함수를 적용한 후 결과를 재귀적으로 평탄화해요.

```typescript
const result = flatMapDeep(collection, iteratee);
```

## 사용법

### `flatMapDeep(collection, iteratee)`

컬렉션의 각 요소에 반복자 함수를 적용한 후 무한 깊이로 평탄화한 배열을 반환해요. 중첩된 배열 구조가 모두 평탄화되어 1차원 배열이 됩니다.

```typescript
import { flatMapDeep } from 'es-toolkit/compat';

// 배열에 함수 적용 후 깊은 평탄화
function duplicate(n) {
  return [[[n, n]]];
}
flatMapDeep([1, 2], duplicate);
// 결과: [1, 1, 2, 2]

// 객체에 함수 적용 후 깊은 평탄화
const obj = { a: 1, b: 2 };
flatMapDeep(obj, (value, key) => [[[key, value]]]);
// 결과: ['a', 1, 'b', 2]

// 문자열 속성으로 매핑 후 깊은 평탄화
const users = [
  { user: 'barney', hobbies: [['hiking', 'coding']] },
  { user: 'fred', hobbies: [['reading']] },
];
flatMapDeep(users, 'hobbies');
// 결과: ['hiking', 'coding', 'reading']
```

반복자 없이 사용하면 값들을 재귀적으로 평탄화해요.

```typescript
import { flatMapDeep } from 'es-toolkit/compat';

const obj = { a: [[1, 2]], b: [[[3]]] };
flatMapDeep(obj);
// 결과: [1, 2, 3]
```

부분 객체로 조건 매핑도 가능해요.

```typescript
import { flatMapDeep } from 'es-toolkit/compat';

const users = [
  { user: 'barney', active: [true, false] },
  { user: 'fred', active: [false] },
];
flatMapDeep(users, { active: [false] });
// 결과: [true, true] (active 배열에 [false]가 포함된 요소들의 매칭 결과)
```

#### 파라미터

- `collection` (`object | null | undefined`): 순회할 컬렉션이에요. 배열, 객체, 문자열이 될 수 있어요.
- `iteratee` (`ListIterator | ObjectIterator | string | object`, 선택): 각 요소에 적용할 반복자예요. 함수, 속성 이름, 또는 부분 객체가 될 수 있어요.

#### 반환 값

(`any[]`): 매핑 후 재귀적으로 평탄화된 새 배열을 반환해요.
