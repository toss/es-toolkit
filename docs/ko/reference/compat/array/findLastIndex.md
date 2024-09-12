# findLastIndex

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`findIndex`와 마찬가지로 배열에서 조건에 맞는 첫 번째 값의 인덱스를 반환하는 대신, 오른쪽에서부터 탐색을 시작해요.

조건은 여러 방법들로 명시할 수 있어요.

- **검사 함수**: 각각의 요소에 대해서 검사하는 함수를 실행해요. 처음으로 `true`를 반환하게 하는 값이 선택돼요.
- **부분 객체**: 주어진 객체와 부분적으로 일치하는 첫 번째 요소가 선택돼요.
- **프로퍼티-값 쌍**: 해당 프로퍼티에 대해서 값이 일치하는 첫 번째 요소가 선택돼요.
- **프로퍼티 이름**: 해당 프로퍼티에 대해서 참으로 평가되는 값을 가지는 첫 번째 요소가 선택돼요.

## 인터페이스

```typescript
function findLastIndex<T>(
  arr: T[],
  doesMatch: (item: T, index: number, arr: T[]) => unknown,
  fromIndex?: number
): T | undefined;
function findLastIndex<T>(arr: T[], doesMatch: Partial<T>, fromIndex?: number): T | undefined;
function findLastIndex<T>(arr: T[], doesMatch: [keyof T, unknown], fromIndex?: number): T | undefined;
function findLastIndex<T>(arr: T[], doesMatch: string, fromIndex?: number): T | undefined;
```

### 파라미터

- `arr` (`T[]`): 검색할 배열.

- `doesMatch`:

  - **검사 함수** (`(item: T, index: number, arr: T[]) => unknown`): 찾는 요소인지 여부를 반환하는 함수.
  - **부분 객체** (`Partial<T>`): 일치시킬 프로퍼티와 값들을 명시한 부분 객체.
  - **프로퍼티-값 쌍** (`[keyof T, unknown]`): 첫 번째가 일치시킬 프로퍼티, 두 번째가 일치시킬 값을 나타내는 튜플.
  - **프로퍼티 이름** (`string`): 참으로 평가되는 값을 가지고 있는지 확인할 프로퍼티 이름.

- `fromIndex` (`number`): 검색을 시작할 인덱스. 기본값은 배열의 마지막 인덱스 (`arr.length - 1`).

### 반환 값

(`number`): 주어진 조건을 만족하는 첫 번째 요소의 인덱스. 없으면 `-1`.

## 예시

```typescript
import { findLastIndex } from 'es-toolkit/compat';

// 검사 함수를 쓰는 경우
const items = [1, 2, 3, 4, 5];
const result = findLastIndex(items, item => item > 3);
console.log(result); // 4

// 부분 객체를 쓰는 경우
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = findLastIndex(items, { name: 'Bob' });
console.log(result); // 1

// 프로퍼티-값 쌍을 쓰는 경우
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = findLastIndex(items, ['name', 'Alice']);
console.log(result); // 0

// 프로퍼티 이름을 쓰는 경우
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = findLastIndex(items, 'name');
console.log(result); // 1
```
