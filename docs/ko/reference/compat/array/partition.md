# partition

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](mdc:../../../compatibility.md)해요.
:::

## 인터페이스

```typescript
function partition<T>(
  collection: ArrayLike<T> | Record<string, T> | null | undefined,
  predicate?: ((value: T, index: number | string, collection: any) => unknown) | Object | Array<any> | string
): [T[], T[]];
```

### 파라미터

- `collection`: 순회할 컬렉션이에요.
- `predicate`: 각 요소마다 실행될 함수예요. 다음과 같은 형태를 사용할 수 있어요:
  - (값, 인덱스|키, 컬렉션)을 받는 함수
  - 속성 값으로 비교할 객체
  - 각 요소에서 값을 가져올 속성 경로
  - [경로, 값] 형태의 배열

### 반환 값

(`[T[], T[]]`): predicate 검사를 통과한 요소들의 배열과 통과하지 못한 요소들의 배열로 이루어진 쌍을 반환해요.

## 예시

```typescript
import { partition } from 'es-toolkit/compat';

// 판별 함수 사용하기
partition([1, 2, 3, 4], n => n % 2 === 0);
// => [[2, 4], [1, 3]]

// 속성 축약 사용하기
const users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
  { user: 'pebbles', age: 1, active: false },
];

// "property" 반복자 축약 사용하기
partition(users, 'active');
// => [[{ 'user': 'barney', 'age': 36, 'active': true }], [{ 'user': 'fred', 'age': 40, 'active': false }, { 'user': 'pebbles', 'age': 1, 'active': false }]]

// "matches" 반복자 축약 사용하기
partition(users, { age: 1, active: false });
// => [[{ 'user': 'pebbles', 'age': 1, 'active': false }], [{ 'user': 'barney', 'age': 36, 'active': true }, { 'user': 'fred', 'age': 40, 'active': false }]]

// "matchesProperty" 반복자 축약 사용하기
partition(users, ['active', false]);
// => [[{ 'user': 'fred', 'age': 40, 'active': false }, { 'user': 'pebbles', 'age': 1, 'active': false }], [{ 'user': 'barney', 'age': 36, 'active': true }]]
```
