# map

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

배열의 각 요소를 변환해서 새로운 배열을 반환해요.

각 요소를 변환하는 방법은 [iteratee](../util/iteratee.md) 함수의 동작에 따라 명시할 수 있어요.

- **변환 함수**: 각 요소에 대해 주어진 함수를 실행해서, 그 결괏값으로 변환해요.
- **프로퍼티 이름**: 각 요소에서 주어진 프로퍼티 이름을 선택해요.
- **프로퍼티-값 쌍**: 각 요소의 프로퍼티가 주어진 값과 일치하는지에 대한 참/거짓 값으로 변환해요.
- **부분 객체**: 각 요소가 부분 객체의 프로퍼티와 값에 일치하는지에 대한 참/거짓 값으로 변환해요.

## 인터페이스

```typescript
function map<T, U>(arr: T[], iteratee: (value: T, index: number, arr: T[]) => U): U[];
function map<T>(arr: T[], iteratee: Partial<T>): boolean[];
function map<T>(arr: T[], iteratee: [keyof T, unknown]): boolean[];
function map<T, K extends keyof T>(arr: T[], iteratee: K): Array<T[K]>;
function map<T>(arr: T[], iteratee?: null | undefined): T[];

function map<T extends object, U>(object: T, iteratee: (value: T[keyof T], key: string, object: T) => U): U[];
function map<T>(object: T, iteratee: Partial<T[keyof T]>): boolean[];
function map<T>(object: T, iteratee: [keyof T[keyof T], unknown]): boolean[];
function map<T, K extends keyof T[keyof T]>(object: T, iteratee: K): Array<T[keyof T][K]>;
function map<T extends object, U>(object: T, iteratee?: null | undefined): U[];
```

### 파라미터

- `arr` (`T[]`) 또는 `object` (`T`): 변환할 배열이나 객체.

::: info `arr`는 `ArrayLike<T>`일 수도 있고, `null` 또는 `undefined`일 수도 있어요

lodash와 완벽하게 호환되도록 `map` 함수는 `arr`을 다음과 같이 처리해요:

- `arr`가 `ArrayLike<T>`인 경우 `Array.from(...)`을 사용하여 배열로 변환해요.
- `arr`가 `null` 또는 `undefined`인 경우 빈 배열로 간주돼요.

:::

::: info `object`는 `null` 또는 `undefined`일 수도 있어요

lodash와 완벽하게 호환되도록 `map` 함수는 `object`를 다음과 같이 처리해요:

- `object`가 `null` 또는 `undefined`인 경우 빈 객체로 변환돼요.

:::

- `iteratee`:

  - 배열의 경우:

    - **변환 함수** (`(value: T, index: number, arr: T[]) => U`): 배열의 각 요소를 변환할 함수.
    - **프로퍼티 이름** (`keyof T`): 각 요소에서 선택할 프로퍼티 이름.
    - **프로퍼티-값 쌍** (`[keyof T, unknown]`): 첫 번째가 일치시킬 프로퍼티, 두 번째가 일치시킬 값을 나타내는 튜플.
    - **부분 객체** (`Partial<T>`): 일치시킬 프로퍼티와 값들을 명시한 부분 객체.

  - 객체의 경우:

    - **변환 함수** (`(item: T[keyof T], index: number, object: T) => unknown`): 객체의 각 값을 변환할 함수.
    - **프로퍼티 이름** (`keyof T[keyof T]`): 객체의 각 값에서 선택할 프로퍼티 이름.
    - **프로퍼티-값 쌍** (`[keyof T[keyof T], unknown]`): 첫 번째가 일치시킬 프로퍼티, 두 번째가 일치시킬 값을 나타내는 튜플.
    - **부분 객체** (`Partial<T[keyof T]>`): 일치시킬 프로퍼티와 값들을 명시한 부분 객체.

### 반환 값

(`any[]`): 변환된 값의 새 배열.

### 예시

```typescript
// 변환 함수 사용
const array = [1, 2, 3];
map(array, value => value * 2); // => [2, 4, 6]

// 이터레이터로 속성 키 사용
const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
map(objects, 'a'); // => [1, 2, 3]

// 이터레이터로 객체 사용
const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
map(objects, { a: 1 }); // => [true, false, false]

// 이터레이터 없음
const numbers = [1, 2, 3];
map(numbers); // => [1, 2, 3]

// 객체로 컬렉션 사용
const obj = { a: 1, b: 2, c: 3 };
map(obj, (value, key) => `${key}: ${value}`); // => ['a: 1', 'b: 2', 'c: 3']
```
