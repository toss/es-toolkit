# findLast

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

배열이나 객체에서 조건에 맞는 마지막 값을 찾아요.

조건은 여러 방법들로 명시할 수 있어요.

- **검사 함수**: 각각의 요소에 대해서 검사하는 함수를 실행해요. 마지막으로 `true`를 반환하게 하는 값이 선택돼요.
- **부분 객체**: 주어진 객체와 부분적으로 일치하는 마지막 요소가 선택돼요.
- **프로퍼티-값 쌍**: 해당 프로퍼티에 대해서 값이 일치하는 마지막 요소가 선택돼요.
- **프로퍼티 이름**: 해당 프로퍼티에 대해서 참으로 평가되는 값을 가지는 마지막 요소가 선택돼요.

## 인터페이스

```typescript
function findLast<T>(
  arr: T[],
  doesMatch: (item: T, index: number, arr: T[]) => unknown,
  fromIndex?: number
): T | undefined;
function findLast<T>(arr: T[], doesMatch: Partial<T>, fromIndex?: number): T | undefined;
function findLast<T>(arr: T[], doesMatch: [keyof T, unknown], fromIndex?: number): T | undefined;
function findLast<T>(arr: T[], doesMatch: PropertyKey, fromIndex?: number): T | undefined;

function findLast<T extends Record<string, unknown>>(
  object: T,
  doesMatch: (item: T[keyof T], index: number, object: T) => unknown,
  fromIndex?: number
): T | undefined;
function findLast<T extends Record<string, unknown>>(
  object: T,
  doesMatch: Partial<T[keyof T]>,
  fromIndex?: number
): T | undefined;
function findLast<T extends Record<string, unknown>>(
  object: T,
  doesMatch: [keyof T[keyof T], unknown],
  fromIndex?: number
): T | undefined;
function findLast<T extends Record<string, unknown>>(
  object: T,
  doesMatch: PropertyKey,
  fromIndex?: number
): T | undefined;
```

### 파라미터

- `arr` (`T[]`) or `object` (`T`): 검색할 배열이나 객체.

::: info `arr`는 `ArrayLike<T>`일 수도 있고, `null` 또는 `undefined`일 수도 있어요

lodash와 완벽하게 호환되도록 `find` 함수는 `arr`을 다음과 같이 처리해요:

- `arr`가 `ArrayLike<T>`인 경우 `Array.from(...)`을 사용하여 배열로 변환해요.
- `arr`가 `null` 또는 `undefined`인 경우 빈 배열로 간주돼요.

:::

::: info `object`는 `null` 또는 `undefined`일 수도 있어요

lodash와 완벽하게 호환되도록 `find` 함수는 `object`를 다음과 같이 처리해요:

- `object`가 `null` 또는 `undefined`인 경우 빈 객체로 변환돼요.

:::

- `doesMatch`:

  - 배열의 경우:

    - **검사 함수** (`(item: T, index: number, arr: T[]) => unknown`): 찾는 요소인지 여부를 반환하는 함수.
    - **부분 객체** (`Partial<T>`): 일치시킬 프로퍼티와 값들을 명시한 부분 객체.
    - **프로퍼티-값 쌍** (`[keyof T, unknown]`): 첫 번째가 일치시킬 프로퍼티, 두 번째가 일치시킬 값을 나타내는 튜플.
    - **프로퍼티 이름** (`PropertyKey`): 참으로 평가되는 값을 가지고 있는지 확인할 프로퍼티 이름.

  - 객체의 경우:
    - **검사 함수** (`(item: T[keyof T], index: number, object: T) => unknown`): 찾는 요소인지 여부를 반환하는 함수.
    - **Partial value** (`Partial<T[keyof T]>`): 일치시킬 프로퍼티와 값들을 명시한 부분 객체.
    - **Property-value pair** (`[keyof T[keyof T], unknown]`): 첫 번째가 일치시킬 프로퍼티, 두 번째가 일치시킬 값을 나타내는 튜플.
    - **Property name** (`PropertyKey`): 참으로 평가되는 값을 가지고 있는지 확인할 프로퍼티 이름.

- `fromIndex` (`number`): 검색을 시작할 인덱스. 기본값은 `0`.

### 반환 값

(`T | undefined`): 주어진 조건을 만족하는 첫 번째 요소. 없으면 `undefined`.

## 예시

### 배열의 경우

```typescript
import { findLast } from 'es-toolkit/compat';

// 검사 함수를 쓰는 경우
const items = [1, 2, 3, 4, 5];
const result = findLast(items, item => item > 3);
console.log(result); // 5

// 부분 객체를 쓰는 경우
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = findLast(items, { name: 'Bob' });
console.log(result); // { id: 2, name: 'Bob' }

// 프로퍼티-값 쌍을 쓰는 경우
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = findLast(items, ['name', 'Alice']);
console.log(result); // { id: 1, name: 'Alice' }

// 프로퍼티 이름을 쓰는 경우
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = findLast(items, 'name');
console.log(result); // { id: 2, name: 'Bob' }
```

### 객체의 경우

```typescript
import { findLast } from 'es-toolkit/compat';

// 검사 함수를 쓰는 경우
const obj = { a: 1, b: 2, c: 3 };
const result = findLast(obj, item => item > 2);
console.log(result); // 3

// 부분 객체를 쓰는 경우
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = findLast(obj, { name: 'Bob' });
console.log(result); // { id: 2, name: 'Bob' }

// 프로퍼티-값 쌍을 쓰는 경우
const items = { alice: { id: 1, name: 'Alice' }, bob: { id: 2, name: 'Bob' } };
const result = findLast(items, ['name', 'Alice']);
console.log(result); // { id: 1, name: 'Alice' }

// 프로퍼티 이름을 쓰는 경우
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = findLast(obj, 'name');
console.log(result); // { id: 2, name: 'Bob' }
```
