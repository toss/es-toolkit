# flatMapDepth (Lodash 호환성)

::: warning `es-toolkit`의 [flatMap](../../array/flatMap.md)을 사용하세요

이 `flatMapDepth` 함수는 Lodash와의 호환성을 위해 여러 형태의 iteratee를 지원하고 `null`이나 `undefined` 처리 등으로 인해 복잡하게 구현되어 있어요. 메인 라이브러리의 `flatMap` 함수는 간단한 함수 iteratee만 지원하므로 더 빠르게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [flatMap](../../array/flatMap.md)를 사용하세요.

:::

배열의 각 요소를 iteratee 함수로 변환한 후 지정된 깊이까지 평탄화해요.

```typescript
const result = flatMapDepth(collection, iteratee, depth);
```

## 레퍼런스

### `flatMapDepth(collection, iteratee, depth)`

배열이나 객체의 각 요소를 주어진 함수로 변환한 후, 결과를 지정된 깊이까지 평탄화해서 새 배열로 반환해요. 중첩된 배열 구조를 원하는 깊이까지만 평탄화할 때 유용해요.

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

// 배열을 변환하고 깊이 2까지 평탄화
flatMapDepth([1, 2], n => [[n, n]], 2);
// => [1, 1, 2, 2]

// 깊이 1로 제한하면 완전히 평탄화되지 않아요
flatMapDepth([1, 2], n => [[n, n]], 1);
// => [[1, 1], [2, 2]]

// 객체에서 값을 추출하고 평탄화
const users = [
  { user: 'barney', hobbies: [['hiking'], ['coding']] },
  { user: 'fred', hobbies: [['reading']] },
];
flatMapDepth(users, 'hobbies', 2);
// => ['hiking', 'coding', 'reading']
```

이 함수는 다양한 형태의 iteratee를 지원해요.

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

// 함수를 사용한 변환
flatMapDepth([1, 2, 3], n => [[n, n]], 2);

// 속성명으로 값 추출
const objects = [{ items: [['a'], ['b']] }, { items: [['c']] }];
flatMapDepth(objects, 'items', 2);
// => ['a', 'b', 'c']

// 객체의 부분 매칭
const users = [{ active: [[true], [false]] }, { active: [[false]] }];
flatMapDepth(users, { active: [[false]] }, 2);
// => [false]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

flatMapDepth(null, n => [n], 1); // => []
flatMapDepth(undefined, n => [n], 1); // => []
```

#### 파라미터

- `collection` (`ArrayLike<T> | Record<string, any> | Record<number, any> | object | null | undefined`): 순회할 배열이나 객체예요.
- `iteratee` (`((value: T, index: number, collection: any) => any) | string | object`, 선택): 각 요소에 대해 실행할 변환 함수나 속성명이에요. 기본값은 `identity`예요.
- `depth` (`number`, 선택): 평탄화할 최대 깊이예요. 기본값은 `1`이에요.

### 반환 값

(`T[]`): iteratee로 변환된 후 지정된 깊이까지 평탄화된 새 배열을 반환해요.
