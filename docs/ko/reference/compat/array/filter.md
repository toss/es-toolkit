# filter

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 조건을 만족하는 요소를 갖는 새로운 배열을 반환해요.

조건은 여러 방법들로 명시할 수 있어요.

- **검사 함수**: 각각의 요소에 대해서 검사하는 함수를 실행해요. 조건에 맞는 요소들을 선택해요.
- **부분 객체**: 주어진 객체와 부분적으로 일치하는 요소들을 선택해요.
- **프로퍼티-값 쌍**: 해당 프로퍼티에 대해서 키와 값이 일치하는 요소들을 선택해요.
- **프로퍼티 이름**: 해당 프로퍼티 이름이 일치하는 요소들을 선택해요.

## 인터페이스

```typescript
function filter<T>(arr: T[], doesMatch: (item: T, index: number, arr: T[]) => unknown): T[];
function filter<T>(arr: T[], doesMatch: Partial<T>): T[];
function filter<T>(arr: T[], doesMatch: [keyof T, unknown]): T[];
function filter<T>(arr: T[], doesMatch: string): T[];

function filter<T extends Record<string, unknown>>(
  object: T,
  doesMatch: (value: T[keyof T], key: keyof T, object: T) => unknown
): T[];
function filter<T extends Record<string, unknown>>(object: T, doesMatch: Partial<T[keyof T]>): T[];
function filter<T extends Record<string, unknown>>(object: T, doesMatch: [keyof T, unknown]): T[];
function filter<T extends Record<string, unknown>>(object: T, doesMatch: string): T[];
```

### 파라미터

- `arr` (`T[]`) or `object` (`T`): 반복할 배열이나 객체.

- `doesMatch`:

  - 배열의 경우:

    - **검사 함수** (`(item: T, index: number, arr: T[]) => unknown`): 각 요소가 조건을 만족하는지 확인하는 함수.
    - **부분 객체** (`Partial<T>`): 요소의 속성과 값과 일치하는지 확인할 부분 객체.
    - **프로퍼티-값 쌍** (`[keyof T, unknown]`): 첫 번째가 찾는 프로퍼티, 두 번째가 찾는 값을 나타내는 튜플.
    - **프로퍼티 이름** (`string`): 특정 속성을 가지고 있는지 확인할 프로퍼티 이름.

  - 객체의 경우:

    - **검사 함수** (`(value: T[keyof T], key: keyof T, object: T) => unknown`): 각 요소가 조건을 만족하는지 확인하는 함수.
    - **부분 객체** (`Partial<T[keyof T]>`): 요소의 속성과 값과 일치하는지 확인할 부분 객체.
    - **프로퍼티-값 쌍** (`[keyof T, unknown]`): 첫 번째가 찾는 프로퍼티, 두 번째가 찾는 값을 나타내는 튜플.
    - **프로퍼티 이름** (`string`): 특정 속성을 가지고 있는지 확인할 프로퍼티 이름.

### 반환 값

(`T[]`): 조건을 만족하는 요소 배열. 없으면 (`[]`)

## 예시

### 배열의 경우

```typescript
import { filter } from 'es-toolkit/compat';

// 검사 함수를 쓰는 경우
filter([1, 2, 3], n => n % 2 === 0);
// => [2]

// 부분 객체를 쓰는 경우
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
filter(arr, { name: 'Bob' });
// => [{ id: 2, name: 'Bob' }]

// 프로퍼티-값 쌍을 쓰는 경우
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
filter(arr, ['name', 'Alice']);
// => [{ id: 1, name: 'Alice' }]

// 프로퍼티 이름을 쓰는 경우
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, age: 28 },
];
filter(arr, 'name');
// => [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

### 객체의 경우

```typescript
import { filter } from 'es-toolkit/compat';

// 검사 함수를 쓰는 경우
const obj = { a: 1, b: 2, c: 3 };
filter(obj, item => item > 2);
// => [3]

// 부분 객체를 쓰는 경우
const obj = {
  a: { id: 1, name: 'Alice' },
  b: { id: 2, name: 'Bob' },
};
filter(obj, { name: 'Bob' });
// => [{ id: 2, name: 'Bob' }]

// 프로퍼티-값 쌍을 쓰는 경우
const obj = {
  alice: { id: 1, name: 'Alice' },
  bob: { id: 2, name: 'Bob' },
};
filter(obj, ['name', 'Alice']);
// => [{ id: 1, name: 'Alice' }]

// 프로퍼티 이름을 쓰는 경우
const obj = {
  a: { id: 1, name: 'Alice' },
  b: { id: 2, name: 'Bob' },
  c: { id: 3, age: 28 },
};
filter(obj, 'name');
// => [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```
