# intersectionBy (Lodash 호환성)

::: warning `es-toolkit`의 [intersectionBy](../../array/intersectionBy.md)를 사용하세요

이 `intersectionBy` 함수는 복잡한 조건 처리, 다중 배열 지원, 프로퍼티 경로 해석 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [intersectionBy](../../array/intersectionBy.md)를 사용하세요.

:::

주어진 조건 함수를 사용해서 여러 배열의 교집합을 구해요.

```typescript
const result = intersectionBy(...arrays, iteratee);
```

## 사용법

### `intersectionBy(...arrays, iteratee)`

여러 배열에서 각 요소를 주어진 조건 함수로 변환한 값을 기준으로 교집합을 구해요. 조건은 함수, 프로퍼티 이름, 부분 객체 등 다양한 형태로 제공할 수 있어요.

```typescript
import { intersectionBy } from 'es-toolkit/compat';

// 함수로 교집합 구하기
const array1 = [2.1, 1.2];
const array2 = [2.3, 3.4];
const result = intersectionBy(array1, array2, Math.floor);
// result는 [2.1] (Math.floor 기준으로 2가 공통)

// 프로퍼티로 교집합 구하기
const users1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const users2 = [
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' },
];
const byId = intersectionBy(users1, users2, 'id');
// byId는 [{ id: 2, name: 'jane' }]

// 세 개 배열의 교집합
const array3 = [2.5, 4.1];
const multiResult = intersectionBy(array1, array2, array3, Math.floor);
// multiResult는 [2.1]

// 배열 형태 객체
const arrayLike1 = { 0: { x: 1 }, 1: { x: 2 }, length: 2 };
const arrayLike2 = { 0: { x: 2 }, 1: { x: 3 }, length: 2 };
const byProperty = intersectionBy(arrayLike1, arrayLike2, 'x');
// byProperty는 [{ x: 2 }]
```

`null`이나 `undefined` 배열은 빈 배열로 처리해요.

```typescript
import { intersectionBy } from 'es-toolkit/compat';

const array1 = [{ x: 1 }, { x: 2 }];
const result = intersectionBy(array1, null, 'x');
// result는 []
```

부분 객체나 프로퍼티-값 쌍으로도 조건을 지정할 수 있어요.

```typescript
import { intersectionBy } from 'es-toolkit/compat';

const products1 = [
  { category: 'fruit', name: 'apple' },
  { category: 'vegetable', name: 'carrot' },
];
const products2 = [
  { category: 'fruit', name: 'banana' },
  { category: 'meat', name: 'beef' },
];

// 부분 객체로 조건 지정
const byCategory = intersectionBy(products1, products2, { category: 'fruit' });
// 프로퍼티-값 쌍으로 조건 지정
const byCategoryPair = intersectionBy(products1, products2, ['category', 'fruit']);
```

#### 파라미터

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): 교집합을 구할 배열들이에요.
- `iteratee` (`Function | PropertyKey | Array | Object`): 각 요소를 변환할 조건이에요. 함수, 프로퍼티 이름, 프로퍼티-값 쌍, 또는 부분 객체일 수 있어요.

#### 반환 값

(`T[]`): 변환된 값을 기준으로 모든 배열에 공통으로 존재하는 요소들의 새 배열을 반환해요.
